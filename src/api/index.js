// import qs from 'qs';
import axios from 'axios'
import 'url-search-params-polyfill'

// Defining base options
const BASE_URL = 'https://vp-api.mall.tv'
const API_URL = `${BASE_URL}/api`

const toQueryString = obj => (
  _.map(obj, (v, k) => {
    if (_.isArray(v)) {
      return (_.map(v, av => `${k}[]=${av}`)).join('&')
    }
    return `${encodeURIComponent(k)}=${encodeURIComponent(v)}`
  })
).join('&')

const postRequestConfig = () => ({
  headers: new Headers({
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  })
})

const refreshToken = () => {
  let body = new URLSearchParams({
    'grant_type': 'client_credentials',
    'client_id': '123456'
  })

  console.log('ahoj')
  let xhr = new XMLHttpRequest()
  xhr.open('POST', `${BASE_URL}/token`, false)
  xhr.responseType = 'json'
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')

  xhr.send(body.toString())
  if (xhr.status === 200) {
    console.log(xhr.response)
    return xhr.response.access_token
  }
}

const requestConfig = async () => {
  let token = await refreshToken()
  return {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  }
}

const handleErrors = (response) => {
  if (!response.ok) {
    throw Error(response.statusText)
  }
  return response
}

const mallGet = (url) => {
  let token = refreshToken()

  return new Promise(function (resolve, reject) {
    let xhr = new XMLHttpRequest()
    xhr.open('GET', `${API_URL}/${url}`)
    xhr.responseType = 'json'
    xhr.setRequestHeader('Authorization', `Bearer ${token}`)

    xhr.onload = function () {
      if (this.status >= 200 && this.status < 300) {
        resolve(xhr.response)
      } else {
        reject(console.error())
      }
    }

    xhr.send()
  })
}

const getHome = async () => {
  let data = await mallGet('home')
  data.Hero.Entities.forEach(entity => {
    entity.Carousel = entity.Thumbnail.replace('desktop', 'homepage-desktop')
  })
  data.Sections.forEach(section => {
    if (section.Entities[0].Logo) {
      section.Entities.forEach(entity => {
        entity.Logo = entity.Logo.replace('mobile', 'desktop')
      })
    }
  })
  data.Categories.forEach(category => {
    category.Image = category.Image.replace('mobile', 'desktop')
  })
  return data
}

const getSerie = async (id) => {
  let params = new URLSearchParams({
    serieEntityId: id,
    page: 0
  })
  let data = await mallGet(`Serie?${params.toString()}`)
  data.SerieImage = data.SerieImage.replace('background-mobile', 'background')

  data.Sections.forEach(section => {
    section.Entities.forEach(entity => {
      entity.serieEntityId = data.EntityId
    })
  })
  return data
}

const getVideo = async (videoEntityId, serieEntityId = null) => {
  let params = new URLSearchParams({
    videoEntityId: videoEntityId,
    playAll: 'false'
  })
  if (serieEntityId !== null) params.append(serieEntityId, serieEntityId)
  let data = await mallGet(`Video?${params.toString()}`)
  console.log(data)
  return data
}

const getSearch = async (searchString) => {
  let data = await mallGet(`Search/${encodeURI(searchString)}`)
  // Videa ze stránky "objevujte" se zobrazí, když to nenajde žádný výsledek
  // Nakonec je nezobrazim jako vysledky
  // if (data.OtherVideos !== null) {
  //   let counter = 0
  //   data.OtherVideos.forEach(section => {
  //     data[`OtherVideos${counter}`] = section
  //     counter++
  //   })
  // }
  return data
}

export default {
  refreshToken,
  mallGet,
  getHome,
  getSeries: async () => { mallGet('home') },
  getSerie,
  getVideo,
  getSearch
}

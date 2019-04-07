import API from './mallapi'
import * as TVDML from 'tvdml'
import ErrorPage from 'screens/ErrorPage'

const callApi = async (functionName, parameters) => {
  try {
    let data = await API[functionName](parameters)
    return data
  } catch (error) {
    TVDML.navigate('errorpage', error.Message, true)
  }
}

const apiList = () => {
  let list = {}
  Object.keys(API).map(call => {
    list[call] = async (parameters) => callApi(call, parameters)
  })
  return list
}

export default apiList()

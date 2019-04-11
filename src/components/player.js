import API from 'api/index.js'

const play = (payload) => {
  let videoEntityId = payload.EntityId
  API.getVideo(videoEntityId, payload.serieEntityId)
    .then((data) => {
      console.log(data)
      const player = new Player()
      const tvosPlaylist = new Playlist()

      let url
      if (data.Resolutions.length === 0) {
        url = `${data.VideoSource}.m3u8`
      } else {
        url = data.Resolutions.slice(-1)[0].ResolutionUrl
      }
      const mediaItem = new MediaItem('video', url)
      mediaItem.artworkImageURL = data.ThumbnailUrl
      mediaItem.title = data.Title
      tvosPlaylist.push(mediaItem)
      player.playlist = tvosPlaylist
      player.play()
    })
}

export default {
  play
}

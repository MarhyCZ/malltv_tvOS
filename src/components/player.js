import API from '../api/index.js'

const play = (payload) => {
  let videoEntityId = payload.EntityId
  API.getVideo(videoEntityId, payload.serieEntityId)
    .then((data) => {
      console.log(data)
      const player = new Player()
      const tvosPlaylist = new Playlist()
      const mediaItem = new MediaItem('video', data.Resolutions.slice(-1)[0].ResolutionUrl)
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

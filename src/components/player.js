import API from '../api/index.js'

const play = (payload) => {
  API.getVideo(payload.videoEntityId, payload.serieEntityId)
    .then((data) => {
      console.log(data)
      const player = new Player()
      const tvosPlaylist = new Playlist()
      const mediaItem = new MediaItem('video', data.Resolutions.slice(-1)[0].ResolutionUrl)
      //mediaItem.artworkImageURL = value.previewImageUrl
      //mediaItem.title = value.title
      tvosPlaylist.push(mediaItem)
      player.playlist = tvosPlaylist
      player.play()
    })
}

export default {
  play
}

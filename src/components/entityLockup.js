import * as TVDML from 'tvdml'

function EntityLockup (props) {
  let image = props.entity.Thumbnail || props.entity.ThumbnailUrl || props.entity.SerieImageUrl
  let imgWidth = props.entity.ThumbnailUrl ? 320 : 210
  let imgHeight = props.entity.ThumbnailUrl ? 180 : 290
  if (props.entity.Logo) {
    return (
      <monogramLockup onSelect={event => TVDML.navigate('channelpage', props.entity)}>
        <monogram src={props.entity.Logo}/>
        <title>{props.entity.Title}</title>
      </monogramLockup>
    )
  }
  return (
    <lockup key={props.entity.Title} onSelect={event => {
      props.section.CardType === 'isVideo' ? TVDML.navigate('play', props.entity)
        : TVDML.navigate('showpage', props.entity)
    }}>
      <img src={image} width={imgWidth} height={imgHeight} />
      <title>{props.entity.Title}</title>
    </lockup>
  )
}

export default EntityLockup

import * as TVDML from 'tvdml'
import PropTypes from 'prop-types'

const style = (props) => {
  if (props.options.highlight === true) {
    return {
      'tv-text-highlight-style': 'show-on-highlight'
    }
  } else {
    return {}
  }
}
const navigate = (props) => {
  props.section.CardType === 'isVideo' ? TVDML.navigate('play', props.entity)
    : TVDML.navigate('seriepage', props.entity)
}

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
    <lockup key={props.entity.Title} onSelect={event => { navigate(props) }}>
      <img src={image} width={imgWidth} height={imgHeight} />
      <title style={style(props)}>{props.entity.Title}</title>
    </lockup>
  )
}

EntityLockup.defaultProps = {
  options: {
    highlight: true
  }
}

export default EntityLockup

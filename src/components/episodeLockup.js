import * as TVDML from 'tvdml'

function EpisodeLockup (props) {
  let episodeMiniCardStyle = {
    'width': '800',
    'height': '170',
    'border-radius': '12',
    'background-color': 'rgba(255, 255, 255, 0.7)'
  }
  let episodeMiniImageStyle = {
    'width': '308',
    'height': '308',
    'tv-position': 'leading'
  }
  let episodeMiniTitleStyle = {
    'text-align': 'natural',
    'tv-text-max-lines': '2',
    'tv-position': 'top',
    'tv-align': 'leading',
    'margin': '32 30 0',
    'tv-text-style': 'callout',
    'color': 'rgba(0, 0, 0, 0.6)'
  }

  let episodeMiniSubtitleStyle = {
    'text-align': 'natural',
    'tv-text-max-lines': '1',
    'tv-position': 'top',
    'tv-align': 'leading',
    'margin': '16 30 0',
    'tv-text-style': 'subhead',
    'color': 'rgba(0, 0, 0, 0.4)'
  }

  let episodeMiniDescriptionStyle = {
    'text-align': 'natural',
    'tv-text-max-lines': '3',
    'tv-position': 'top',
    'tv-align': 'leading',
    'margin': '9 30 0',
    'tv-text-style': 'caption1',
    'color': 'rgba(0, 0, 0, 0.4)'
  }
  return (
    <card key={props.entity.Title} style={ episodeMiniCardStyle } onSelect={event => TVDML.navigate('play', props.entity)}>
      <img style={ episodeMiniImageStyle } src={props.entity.ThumbnailUrl} />
      <title style={ episodeMiniTitleStyle }>{props.entity.Title}</title>
      <subtitle style={ episodeMiniSubtitleStyle }>{ props.entity.PublishDate }</subtitle>
    </card>
  )
}

export default EpisodeLockup

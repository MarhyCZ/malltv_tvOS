import PropTypes from 'prop-types'

import { showMessageFactory } from '../helpers/show-message'

import withCounter from '../redux/withCounter'
import { connect } from 'react-redux'

function Screen2 (props) {
  console.log(props)
  const counter = props.counter || 0

  return (
    <document>
      <alertTemplate>
        <title style={{ tvTextStyle: 'title1' }}>💃</title>
        <text>And here is a global counter!</text>
        <text style={{ tvTextStyle: 'title2' }}>
          {props.counter}
        </text>
        <button onSelect={showMessageFactory('😏')}>
          <text>🚗</text>
        </button>
      </alertTemplate>
    </document>
  )
}

Screen2.propTypes = {
  counter: PropTypes.number.isRequired
}

Screen2.defaultProps = {
  counter: 0
}

const mapStateToProps = function (state) {
  console.log('change')
  return {
    counter: state.counter
  }
}

export default Screen2

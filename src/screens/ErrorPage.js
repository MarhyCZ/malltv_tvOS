import PropTypes from 'prop-types'

function ErrorPage (props) {
  console.log(props)
  return (
    <document>
      <alertTemplate>
        <title>Chyba :/</title>
        <description>{props.message}</description>
      </alertTemplate>
    </document>
  )
}

ErrorPage.defaultProps = {
  message: 'Něco se stalo špatně'
}

export default ErrorPage

import * as TVDML from 'tvdml'
import { withAppContext } from './withAppContext'
import { useStateValue } from './state'
import { useEffect } from 'react'

function AppMenu (props) {
  return (
    <document>
      <menuBarTemplate>
        <menuBar>
          <menuItem route='discover'>
            <title>Objevujte</title>
          </menuItem>
          <menuItem route='page2' autoHighlight>
            <title>Page2</title>
          </menuItem>
          <menuItem route='searchpage'>
            <title>Vyhledat</title>
          </menuItem>
        </menuBar>
      </menuBarTemplate>
    </document>
  )
}

export default withAppContext(AppMenu)

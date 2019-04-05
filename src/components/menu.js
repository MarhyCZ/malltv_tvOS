import * as TVDML from 'tvdml'
import { withAppContext } from './withAppContext'
import { useStateValue } from './state'
import { useEffect } from 'react'

function AppMenu (props) {
  const [state, dispatch] = useStateValue()
  useEffect(() => {
    TVDML
      .subscribe(TVDML.event.RESUME)
      .pipe(() => {
        // console.log('resumeeeeed')
        dispatch({ type: 'increment' })
        // console.log('menu říká:')
        // console.log(state)
      })
  }, [])
  useEffect(() => {
    console.log('wow ' + state.resumeCount)
  }, [state.resumeCount])
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
          <menuItem route='page3'>
            <title>Page3</title>
          </menuItem>
        </menuBar>
      </menuBarTemplate>
    </document>
  )
}

export default withAppContext(AppMenu)

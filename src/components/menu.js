import * as TVDML from 'tvdml'
import { withAppContext } from './withAppContext'
import { useStateValue } from './state'

function AppMenu (props) {
  //const [{ resumeCount }, dispatch] = useStateValue()
  TVDML
    .subscribe(TVDML.event.RESUME)
    .pipe(() => {
      console.log('resumeeeeed')
      //dispatch({ type: 'increment' })
      //console.log(props.context)
    })

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

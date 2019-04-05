import React, { useContext } from 'react'
import { StateProvider } from './state'

// export function withAppContext (Component) {
//   return function WrapperComponent (props) {
//     return (
//       <StateProvider>
//         <AppContext.Consumer>
//           {state => <Component {...props} context={state} />}
//         </AppContext.Consumer>
//       </StateProvider>
//     )
//   }
// }

export function withAppContext (Component) {
  return function WrapperComponent (props) {
    return (
      <StateProvider>
          <Component {...props} />
      </StateProvider>
    )
  }
}

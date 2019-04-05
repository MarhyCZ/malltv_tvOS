import React, { createContext, useContext, useReducer } from 'react'
const AppContext = createContext()
const initialState = {
  resumeCount: 0
}
const reducer = (state, action) => {
  switch (action.type) {
    case 'increment':
      console.log('incrementing')
      // console.log('reducer:')
      // console.log(state)
      return {
        ...state,
        resumeCount: state.resumeCount + 1
      }

    default:
      return state
  }
}

export const StateProvider = ({ children }) => {
  StateProvider.reducer = useReducer(reducer, initialState)
  return (
    <AppContext.Provider value={StateProvider.reducer}>
      {children}
    </AppContext.Provider>
  )
}
export const useStateValue = () => useContext(AppContext)

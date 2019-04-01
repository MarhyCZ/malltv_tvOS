import React, { createContext, useContext, useReducer } from 'react'
export const AppContext = createContext()
const initialState = {
  resumeCount: 0
}
export const StateProvider = ({ children }) => (
  <AppContext.Provider value={initialState}>
    {children}
  </AppContext.Provider>
)
export const useStateValue = () => useContext(AppContext)

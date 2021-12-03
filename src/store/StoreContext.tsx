import { createContext, useReducer } from "react"
import { Action } from "./action"
import { defaultState, reducer, StateType } from "./reducer"

interface StoreContextReducer {
  state: StateType
  dispatch: React.Dispatch<Action>
}

interface StoreProviderProps {
  children: React.ReactNode
  initialState?: StateType
}

export const StoreContext = createContext({} as StoreContextReducer)

export const StoreProvider: React.FC<StoreProviderProps> = ({ children, initialState = defaultState }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <StoreContext.Provider value={{ state: state, dispatch: dispatch }}>
      {children}
    </StoreContext.Provider>
  )
}
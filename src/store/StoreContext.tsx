import { createContext, useReducer } from "react"
import Crop from "../types/crop"
import { ActionType } from "./actionTypes"

// XXX: Type code from this file properly

interface StoreContextReducer {
  state: any
  dispatch: any
}

interface StateType {
  currentVideoTime: number
  crops: Array<Crop>
}

interface StoreProviderProps {
  children: any
}

export const initialState: StateType = {
  currentVideoTime: 0.0,
  crops: []
}

// XXX: rewrite this in a more functional/immutable way
export const reducer = (state: any, action: any) => {
  switch (action.type) {
    case ActionType.SET_CURRENT_VIDEO_TIME:
      return { ...state, currentVideoTime: action.payload }
    case ActionType.SELECT_CROP:
      state.crops.forEach((crop: Crop, i: number) => {
        if (i === action.payload) {
          state.crops[i].selected = true
        }
      })

      return state
    case ActionType.DESELECT_ALL_CROPS:
      state.crops.forEach((crop: Crop) => crop.selected = false)
      return state
    case ActionType.ADD_CROP:
      state.crops.push(action.payload.crop)
      return state
    case ActionType.REPLACE_CROP:
      state.crops.forEach((crop: Crop, i: number) => {
        if (i === action.payload.index) {
          state.crops[i] = action.payload.crop
        }
      })

      return state
    case ActionType.REPLACE_ALL_CROPS:
      return { ...state, crops: action.payload.crops }
    default:
      return state
  }
}

export const StoreContext = createContext({} as StoreContextReducer)

export const StoreProvider: React.FC<StoreProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <StoreContext.Provider value={{ state: state, dispatch: dispatch }}>
      {children}
    </StoreContext.Provider>
  )
}
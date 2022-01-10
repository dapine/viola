import { TimelineProps } from "../components/Timeline"
import Crop from "../types/crop"
import Text from "../types/text"
import { Variable } from "../types/variable"
import { Action, ActionType } from "./action"

export interface StateType {
  currentVideoTime: number
  videoDuration: number
  timelineConfig: TimelineProps
  crops: Array<Crop>
  variables: Array<Variable>
}

export const defaultState: StateType = {
  currentVideoTime: 0.0,
  videoDuration: 0.0,
  timelineConfig: {
    width: 80,
    height: window.innerHeight,
    minimumScale: 10,
    minimumScaleTime: 1,
    minimumScalesInLongScale: 10,
    lineWidth: 1,
    offsetLeft: 0,
    lineColor: "#666",
    longLineColor: "#000",
  },
  crops: [],
  variables: [],
}

// XXX: rewrite this in a more functional/immutable way
export const reducer = (state: any, action: Action) => {
  switch (action.type) {
    case ActionType.SET_CURRENT_VIDEO_TIME:
      return { ...state, currentVideoTime: action.payload }
    case ActionType.SET_VIDEO_DURATION:
      return { ...state, videoDuration: action.payload }
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
      return { ...state }
    case ActionType.REPLACE_CROP:
      state.crops.forEach((crop: Crop, i: number) => {
        if (i === action.payload.index) {
          state.crops[i] = action.payload.crop
        }
      })

      return { ...state, crops: [...state.crops] }
    case ActionType.REMOVE_CROP:
      const newCrops = state.crops.filter((crop: Crop) => crop !== action.payload.crop)
      return { ...state, crops: newCrops }
    case ActionType.REPLACE_ALL_CROPS:
      return { ...state, crops: action.payload.crops }
    case ActionType.SET_TIMELINE_HEIGHT:
      return { ...state, timelineConfig: { ...state.timelineConfig, height: action.payload } }
    case ActionType.SET_TIMELINE_MINIMUM_SCALE:
      return { ...state, timelineConfig: { ...state.timelineConfig, minimumScale: action.payload } }
    case ActionType.REPLACE_ALL_TEXTS_FROM_CROP:
      state.crops[action.payload.cropIndex].texts = action.payload.texts
      return { ...state }
    case ActionType.REPLACE_TEXT_FROM_CROP:
      state.crops[action.payload.cropIndex].texts[action.payload.textIndex].value = action.payload.textValue
      return { ...state, crops: [...state.crops] }

    case ActionType.REMOVE_TEXT_FROM_CROP:
      const ts = state.crops[action.payload.cropIndex].texts.filter((text: Text) => text !== action.payload.text)
      state.crops[action.payload.cropIndex].texts = ts
      return { ...state, crops: [...state.crops] }

    case ActionType.ADD_VARIABLE_TO_TEXT:
      const nvars = [...state.crops[action.payload.cropIndex].texts[action.payload.textIndex].variables, action.payload.variable]
      state.crops[action.payload.cropIndex].texts[action.payload.textIndex].variables = nvars

      return { ...state, crops: [...state.crops] }

    case ActionType.REMOVE_VARIABLE_FROM_TEXT:
      const rem = state.crops[action.payload.cropIndex].texts[action.payload.textIndex].variables.filter((v: Variable) => v.type !== action.payload.variable.type && v.value !== action.payload.variable.value)
      state.crops[action.payload.cropIndex].texts[action.payload.textIndex].variables = rem

      return { ...state, crops: [...state.crops] }

    case ActionType.ADD_VARIABLE:
      return { ...state, variables: [...state.variables, action.payload] }
    case ActionType.SET_VARIABLE_VALUE:
      state.variables[action.payload.i].value = action.payload.value
      return {
        ...state,
        variables:
          [
            ...state.variables.slice(0, action.payload.i),
            state.variables[action.payload.i],
            ...state.variables.slice(action.payload.i + 1)
          ]
      }
    default:
      return state
  }
}
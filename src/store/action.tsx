export interface Action {
  type: ActionType,
  payload: any
}

export enum ActionType {
  SET_CURRENT_VIDEO_TIME,
  SET_VIDEO_DURATION,

  SELECT_CROP,
  DESELECT_ALL_CROPS,
  ADD_CROP,
  REPLACE_CROP,
  REPLACE_ALL_CROPS,

  SET_TIMELINE_HEIGHT,
  SET_TIMELINE_MINIMUM_SCALE,

  REMOVE_CROP,
  REPLACE_ALL_TEXTS_FROM_CROP,
  REPLACE_TEXT_FROM_CROP,

  REMOVE_TEXT_FROM_CROP,
}
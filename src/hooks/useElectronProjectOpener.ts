import React, { useEffect } from "react"
import { Action, ActionType } from "../store/action"
import isElectron from "../utils/isElectron"

const electron = isElectron() ? window.require("electron") : undefined

export const useElectronProjectOpener = (dispatch: React.Dispatch<Action>) => {
  useEffect(() => {
    if (electron) {
      electron.ipcRenderer.on('OPEN_PROJECT', (e: any, json: any) => {
        // XXX
        // setVideoPath(json.videoPath)
        dispatch({ type: ActionType.REPLACE_ALL_CROPS, payload: { crops: json.crops } })
      })

      return () => electron.ipcRenderer.removeAllListeners('OPEN_PROJECT')
    }
  }, [dispatch])
}
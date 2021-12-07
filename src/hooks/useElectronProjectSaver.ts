import { useEffect } from "react"
import Crop from "../types/crop"
import isElectron from "../utils/isElectron"

const electron = isElectron() ? window.require("electron") : undefined

export const useElectronProjectSaver = (videoPath: string, crops: Array<Crop>) => {
  useEffect(() => {
    if (electron) {
      electron.ipcRenderer.on('SAVE', (e: any, filepath: string) => {
        if (filepath) {
          const saveObj = {
            videoPath: videoPath,
            crops: crops
          }
          const json = JSON.stringify(saveObj)
          electron.ipcRenderer.send('SAVE', { filepath: filepath, content: json })
        }
      })

      return () => electron.ipcRenderer.removeAllListeners('SAVE')
    }
  }, [videoPath, crops])
}
import { useEffect } from "react"
import { toSrtString } from "../exporters/srt"
import Crop from "../types/crop"
import isElectron from "../utils/isElectron"

const electron = isElectron() ? window.require("electron") : undefined

export const useElectronSubtitleExporter = (crops: Array<Crop>) => {
  useEffect(() => {
    if (electron) {
      electron.ipcRenderer.on('EXPORT_SRT', (e: any, filepath: string) => {
        if (filepath) {
          // TODO: Support more formats
          const content: string = toSrtString(crops)
          electron.ipcRenderer.send('EXPORT_SRT', { filepath: filepath, content: content })
        }
      })

      return () => electron.ipcRenderer.removeAllListeners('EXPORT_SRT')
    }
  }, [crops])
}
import { useEffect, useState } from "react"
import isElectron from "../utils/isElectron"

const electron = isElectron() ? window.require("electron") : undefined

export const useElectronFileOpener = (defaultFilePath: string) => {
  const [filePath, setFilePath] = useState(defaultFilePath)

  useEffect(() => {
    if (electron) {
      electron.ipcRenderer.on('FILE_OPEN', (e: any, data: any) => {
        if (data.length > 0) setFilePath(data[0])
      })

      return () => electron.ipcRenderer.removeAllListeners('FILE_OPEN')
    }
  })

  return filePath
}
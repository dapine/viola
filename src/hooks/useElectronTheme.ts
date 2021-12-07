import { useEffect } from "react"
import { ColorSchemeMode } from "../style/theme"
import isElectron from "../utils/isElectron"

const electron = isElectron() ? window.require("electron") : undefined

export const useElectronTheme = (mode: ColorSchemeMode) => {
  useEffect(() => {
    if (electron) {
      electron.ipcRenderer.send('THEME', { mode: mode })
    }
  }, [mode])
}
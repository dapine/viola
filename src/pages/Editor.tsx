import { useContext, useEffect, useState } from "react"
import { toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import { useTheme } from "styled-components"
import { Badge } from "../components/styled/badge"
import { Flex } from "../components/styled/flex"
import SubtitleCard from "../components/SubtitleCard"
import Timeline from "../components/Timeline"
import Video from "../components/Video"
import { toSrtString } from "../exporters/srt"
import { ActionType } from "../store/action"
import { StoreContext } from "../store/StoreContext"
import Crop from "../types/crop"
import isElectron from "../utils/isElectron"

const electron = isElectron() ? window.require("electron") : undefined
// auto load video when in browser/dev
const defaultVideoPath = isElectron() ? "" : "/BigBuckBunny.mp4"

const Editor: React.FC = () => {
  const { state, dispatch } = useContext(StoreContext)

  const [videoPath, setVideoPath] = useState(defaultVideoPath)

  const theme = useTheme()

  useEffect(() => {
    if (isElectron()) {
      electron.ipcRenderer.on('FILE_OPEN', (e: any, data: any) => {
        if (data.length > 0) setVideoPath(data[0])
      })
      electron.ipcRenderer.on('OPEN_PROJECT', (e: any, json: any) => {
        setVideoPath(json.videoPath)
        dispatch({ type: ActionType.REPLACE_ALL_CROPS, payload: { crops: json.crops } })
      })
      electron.ipcRenderer.on('EXPORT_SRT', (e: any, filepath: string) => {
        if (filepath) {
          const content: string = toSrtString(state.crops)
          electron.ipcRenderer.send('EXPORT_SRT', { filepath: filepath, content: content })
        }
      })
      electron.ipcRenderer.on('SAVE', (e: any, filepath: string) => {
        if (filepath) {
          const saveObj = {
            videoPath: videoPath,
            crops: state.crops
          }
          const json = JSON.stringify(saveObj)
          electron.ipcRenderer.send('SAVE', { filepath: filepath, content: json })
        }
      })

      electron.ipcRenderer.send('THEME', { mode: theme.mode })
    }
  }, [state.crops, videoPath, dispatch, theme.mode])

  const workspace = (
    <>
      <Flex>
        <div style={{ width: "10%", height: window.innerHeight, overflowY: "auto" }}>
          <Timeline {...state.timelineConfig} />
        </div>
        <div style={{ width: "40%", padding: "1rem", height: window.innerHeight, overflowY: "auto" }}>
          {
            state.crops.map((crop: Crop, i: number) =>
              <SubtitleCard key={i} id={i} subKey={(i + 1).toString()} crop={crop} />
            )
          }
        </div>
        <div style={{ width: "50%" }}>
          <Video src={videoPath}
            width="640"
            height="480"
            controls={true}
            onError={() => toast.error("Could not load the video", { autoClose: false, position: 'top-right' })} />
        </div>
      </Flex>
    </>
  )

  const emptyWorkspace = (
    <Flex style={{ justifyContent: "center" }}>
      <div style={{ textAlign: "center" }}>
        <h1>(҂◡_◡)</h1>
        <h2>It looks like you didn't load the video/project</h2>
        <h3>Press <kbd>Ctrl (or Cmd)</kbd> + <kbd>Shift</kbd> + <kbd>O</kbd> or click on <Badge>File &gt; Open video</Badge></h3>
        <h3>or</h3>
        <h3><kbd>Ctrl (or Cmd)</kbd> + <kbd>O</kbd> or click on <Badge color={theme.colors.attention}>File &gt; Open project</Badge></h3>
      </div>
    </Flex>
  )

  return videoPath === "" && state.crops.length === 0 ? emptyWorkspace : workspace
}

export default Editor
import base64 from "base-64"
import { useContext, useEffect, useState } from "react"
import { toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import { useTheme } from "styled-components"
import utf8 from "utf8"
import { Badge } from "../components/styled/badge"
import { Flex } from "../components/styled/flex"
import { Kbd } from "../components/styled/kbd"
import SubtitleCard from "../components/SubtitleCard"
import Timeline from "../components/Timeline"
import Video from "../components/Video"
import { toVttString } from "../exporters/webvtt"
import { useElectronFileOpener } from "../hooks/useElectronFileOpener"
import { useElectronProjectOpener } from "../hooks/useElectronProjectOpener"
import { useElectronProjectSaver } from "../hooks/useElectronProjectSaver"
import { useElectronSubtitleExporter } from "../hooks/useElectronSubtitleExporter"
import { useElectronTheme } from "../hooks/useElectronTheme"
import { StoreContext } from "../store/StoreContext"
import Crop from "../types/crop"
import isElectron from "../utils/isElectron"

// auto load video when in browser/dev
const defaultVideoPath = isElectron() ? "" : "/BigBuckBunny.mp4"

const Editor: React.FC = () => {
  const { state, dispatch } = useContext(StoreContext)

  const theme = useTheme()

  // Electron events
  const videoPath = useElectronFileOpener(defaultVideoPath)
  useElectronSubtitleExporter(state.crops)
  useElectronProjectSaver(videoPath, state.crops)
  useElectronProjectOpener(dispatch)
  useElectronTheme(theme.mode)

  const [subPreview, setSubPreview] = useState("")

  useEffect(() => {
    setSubPreview(base64.encode(utf8.encode(toVttString(state.crops))))
  }, [state.crops])

  const workspace = (
    <>
      <Flex>
        <div style={{ width: "10%", height: window.innerHeight - 15, overflowY: "auto", resize: "horizontal", minWidth: "8%", maxWidth: "15%" }}>
          <Timeline {...state.timelineConfig} />
        </div>
        <div style={{ width: "40%", padding: "1rem", height: window.innerHeight - 45, overflowY: "auto", resize: "horizontal", maxWidth: "40%", minWidth: "30%" }}>
          {
            state.crops.map((crop: Crop, i: number) =>
              <SubtitleCard key={i} id={i} subKey={(i + 1).toString()} crop={crop} />
            )
          }
        </div>
        <div style={{ width: "50%" }}>
          <Video src={videoPath}
            width="100%"
            controls={true}
            onError={() => toast.error("Could not load the video", { autoClose: false, position: 'top-right' })}
            srcTrack={subPreview} />
        </div>
      </Flex>
    </>
  )

  const emptyWorkspace = (
    <Flex style={{ justifyContent: "center" }}>
      <div style={{ textAlign: "center" }}>
        <h1>(҂◡_◡)</h1>
        <h2>It looks like you didn't load the video/project</h2>
        <h3>Press <Kbd>Ctrl (or Cmd)</Kbd> + <Kbd>Shift</Kbd> + <Kbd>O</Kbd> or click on <Badge>File &gt; Open video</Badge></h3>
        <h3>or</h3>
        <h3><Kbd>Ctrl (or Cmd)</Kbd> + <Kbd>O</Kbd> or click on <Badge color={theme.colors.attention}>File &gt; Open project</Badge></h3>
      </div>
    </Flex>
  )

  return videoPath === "" && state.crops.length === 0 ? emptyWorkspace : workspace
}

export default Editor
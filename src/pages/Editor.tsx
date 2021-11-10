import { saveAs } from "file-saver"
import { useContext, useEffect, useState } from "react"
import SubtitleCard from "../components/SubtitleCard"
import Timeline from "../components/Timeline"
import Video from "../components/Video"
import { toSrt, toSrtString } from "../exporters/srt"
import { StoreContext } from "../store/StoreContext"
import Crop from "../types/crop"

const electron = window.require("electron")

const Editor: React.FC = () => {
  const { state } = useContext(StoreContext)

  const [videoPath, setVideoPath] = useState("")

  useEffect(() => {
    electron.ipcRenderer.on('FILE_OPEN', (e: any, data: any) => {
      if (data.length > 0) setVideoPath(data[0])
    })
    electron.ipcRenderer.on('EXPORT_SRT', (e: any, filepath: string) => {
      if (filepath) {
        const content: string = toSrtString(state.crops)
        electron.ipcRenderer.send('EXPORT_SRT', { filepath: filepath, content: content })
      }
    })
  }, [])

  return (
    <>
      <div className="container">
        <div style={{ width: "10%", height: window.innerHeight, overflowY: "auto" }}>
          <Timeline {...state.timelineConfig} />
        </div>
        <div style={{ width: "40%", padding: "1rem", height: "100%", overflowY: "auto" }}>
          {
            state.crops.map((crop: Crop, i: number) =>
              <SubtitleCard id={i} subKey={(i + 1).toString()} crop={crop} />
            )
          }
        </div>
        <div style={{ width: "50%" }}>
          <Video src={videoPath} width="640" height="480" controls={true} />
        </div>
      </div>
    </>
  )
}

export default Editor
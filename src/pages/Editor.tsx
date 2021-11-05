import { saveAs } from "file-saver"
import { useContext } from "react"
import SubtitleCard from "../components/SubtitleCard"
import Timeline from "../components/Timeline"
import Video from "../components/Video"
import { toSrt } from "../exporters/srt"
import { StoreContext } from "../store/StoreContext"
import Crop from "../types/crop"
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from "react-dnd-html5-backend"

const Editor: React.FC = () => {
  const { state } = useContext(StoreContext)

  const exportSrt = () => {
    const captions: string = toSrt(state.crops).join('')
    const blob = new Blob([captions], {type: "text/plain;charset=utf-8"})
    saveAs(blob, "output.srt")
  }

  const copyToClipboard = () => {
    const captions: string = toSrt(state.crops).join('')
    navigator.clipboard.writeText(captions)
  }

  return (
    <>
      <button disabled={state.crops.length === 0} onClick={() => exportSrt()}>export to .srt</button>
      <button disabled={state.crops.length === 0} onClick={() => copyToClipboard()}>copy to clipboard</button>
      <div className="container">
        <div style={{ width: "10%", height: window.innerHeight, overflowY: "auto" }}>
          <Timeline {...state.timelineConfig} />
        </div>
        <DndProvider backend={HTML5Backend}>
          <div style={{ width: "40%", padding: "1rem", height: "100%", overflowY: "auto" }}>
            {
              state.crops.map((crop: Crop, i: number) =>
                <SubtitleCard id={i} subKey={(i + 1).toString()} crop={crop} />
              )
            }
          </div>
        </DndProvider>
        <div style={{ width: "50%" }}>
          <Video src="/BigBuckBunny.mp4" width="640" height="480" controls={true} />
        </div>
      </div>
    </>
  )
}

export default Editor
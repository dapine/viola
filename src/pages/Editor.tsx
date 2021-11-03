import { useContext } from "react"
import { saveAs } from "file-saver"
import SubtitleCard from "../components/SubtitleCard"
import Timeline from "../components/Timeline"
import Video from "../components/Video"
import { toSrt } from "../exporters/srt"
import { StoreContext } from "../store/StoreContext"
import Crop from "../types/crop"

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
        <div style={{ width: "10%" }}>
          <Timeline
            width={100}
            height={window.innerHeight}
            minimumScale={10}
            minimumScaleTime={1}
            minimumScalesInLongScale={10}
            lineWidth={1}
            offsetLeft={0}
            lineColor="#666"
            longLineColor="#000"
          />
        </div>
        <div style={{ width: "40%", padding: "1rem", height: "100%", overflowY: "auto" }}>
          {
            state.crops.map((crop: Crop, i: number) =>
              <SubtitleCard id={i} subKey={(i + 1).toString()} crop={crop} />
            )
          }
        </div>
        <div style={{ width: "50%" }}>
          <Video src="/BigBuckBunny.mp4" width="640" height="480" controls={true} />
        </div>
      </div>
    </>
  )
}

export default Editor
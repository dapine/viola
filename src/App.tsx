import { useEffect, useState } from "react";
import Timeline from "./components/Timeline";
import Video from "./components/Video";

import "./App.css"
import Dialog from "./components/Dialog";
import Textarea from "./components/Textarea";
import Crop from "./types/crop";
import Text from "./types/text";

function App() {
  const [currentVideoTime, setCurrentVideoTime] = useState(0.0)
  const [crops, setCrops] = useState([] as Array<Crop>)

  const [isDialogOpen, setDialogOpen] = useState(false)
  const [currentText, setCurrentText] = useState("")

  useEffect(() => {
    const selected = crops.find(crop => crop.selected)

    if (selected !== undefined) {
      setDialogOpen(true)
    } else {
      setDialogOpen(false)
      setCurrentText("")
    }
  }, [crops])

  return (
    <div className="container">
      <div style={{ width: "10%" }}>
        <Timeline
          width={250}
          height={window.innerHeight}
          minimumScale={10}
          minimumScaleTime={1}
          minimumScalesInLongScale={10}
          lineWidth={1}
          offsetLeft={0}
          lineColor="#666"
          longLineColor="#000"
          setVideoTime={setCurrentVideoTime}
          crops={crops}
          setCrops={setCrops}
        />
      </div>
      <div style={{ width: "40%", padding: "1rem", height: "100%", overflowY: "auto" }}>
        {isDialogOpen &&
          <Dialog>
            <div className="container">
              <Textarea value={currentText} setValue={setCurrentText} />
              <button onClick={() => {
                const selected = crops.find(crop => crop.selected)

                if (selected !== undefined) {
                  const i = crops.findIndex(crop => crop === selected)
                  const t: Text = { order: selected.texts.length, value: currentText }
                  crops[i].texts = [...crops[i].texts, t]
                  setCrops(crops)
                  setDialogOpen(false)
                  setCurrentText("")
                }
              }}>Ok</button>
            </div>
          </Dialog>}


        {crops.map((crop, i) => {
          return (
            <div key={i} className="card" style={{ margin: "1rem" }}>
              <div style={{marginBottom: "0.4rem"}}><span className="badge">{i+1}</span></div>
              <div><span>{crop.start}</span> ➡️ <span>{crop.end}</span></div>
              <div>
                {crop.texts.map((text, i) => {
                  return <p key={i}>{text.value}</p>
                })}
              </div>
            </div>)
        })}
      </div>
      <div style={{ width: "50%" }}>
        <Video src="/BigBuckBunny.mp4" width="640" height="480" controls={true} currentTime={currentVideoTime} />
      </div>
    </div>
  )
}

export default App;

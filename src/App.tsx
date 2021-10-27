import { useEffect, useState } from "react";
import Timeline from "./Timeline";
import Video from "./Video";

import "./App.css"
import Dialog from "./Dialog";
import Textarea from "./Textarea";
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
      <div>
        {isDialogOpen &&
          <Dialog>
            <div className="container">
              <Textarea value={currentText} setValue={setCurrentText} />
              <button onClick={() => {
                const selected = crops.find(crop => crop.selected)

                if (selected !== undefined) {
                  const i = crops.findIndex(crop => crop === selected)
                  const t: Text = {order: selected.texts.length, value: currentText}
                  crops[i].texts = [...crops[i].texts, t]
                  setCrops(crops)
                  setDialogOpen(false)
                  setCurrentText("")
                }
              }}>Ok</button>
            </div>
          </Dialog>}
      </div>
      <Video src="/BigBuckBunny.mp4" width="640" height="480" controls={true} currentTime={currentVideoTime} />
    </div>
  )
}

export default App;

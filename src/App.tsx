import React, { useEffect, useState } from "react"
import "./App.css"
import SubtitleCard from "./components/SubtitleCard"
import Timeline from "./components/Timeline"
import Video from "./components/Video"
import Crop from "./types/crop"
import Text from "./types/text"


function App() {
  // XXX: create a store to use these states both by Timeline and SubtitleCard
  const [currentVideoTime, setCurrentVideoTime] = useState(0.0)
  const [crops, setCrops] = useState([] as Array<Crop>)

  useEffect(() => {
    const selected = crops.find(crop => crop.selected)
  }, [crops])

  return (
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
          setVideoTime={setCurrentVideoTime}
          crops={crops}
          setCrops={setCrops}
        />
      </div>
      <div style={{ width: "40%", padding: "1rem", height: "100%", overflowY: "auto" }}>
        {crops.map((crop, i) => 
          <SubtitleCard id={i} key={i.toString()} crop={crop} crops={crops} setCrops={setCrops} />
        )}
      </div>
      <div style={{ width: "50%" }}>
        <Video src="/BigBuckBunny.mp4" width="640" height="480" controls={true} currentTime={currentVideoTime} />
      </div>
    </div>
  )
}

export default App;

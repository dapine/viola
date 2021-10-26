import { useState } from "react";
import Timeline from "./Timeline";
import Video from "./Video";

function App() {
  const [currentVideoTime, setCurrentVideoTime] = useState(0.0)

  return (
    <div>
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
      />
      <Video src="/BigBuckBunny.mp4" width="640" height="480" controls={true} currentTime={currentVideoTime} />
    </div>
  )
}

export default App;

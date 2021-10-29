import { useContext, useEffect, useRef } from "react"
import { StoreContext } from "../store/StoreContext"

interface VideoProps {
  src: string
  width: string
  height: string
  controls?: boolean
}

const Video: React.FC<VideoProps> = props => {
  const { src, width, height, controls = false } = props

  const { state } = useContext(StoreContext)

  const ref = useRef(null)

  useEffect(() => {
    const video = ref?.current

    // @ts-ignore: Object is possibly 'null'.
    video.currentTime = state.currentVideoTime
  }, [state.currentVideoTime]);

  return <video ref={ref} src={src} width={width} height={height} controls={controls} />
}

export default Video
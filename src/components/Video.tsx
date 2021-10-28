import { useEffect, useRef } from "react"

interface VideoProps {
  src: string
  width: string
  height: string
  controls?: boolean
  currentTime: number
}

const Video: React.FC<VideoProps> = props => {
  const { src, width, height, controls = false, currentTime } = props

  const ref = useRef(null)

  useEffect(() => {
    const video = ref?.current

    // @ts-ignore: Object is possibly 'null'.
    video.currentTime = currentTime
  }, [currentTime]);

  return <video ref={ref} src={src} width={width} height={height} controls={controls} />
}

export default Video
import { SyntheticEvent, useContext, useEffect, useRef } from "react"
import { ActionType } from "../store/actionTypes"
import { StoreContext } from "../store/StoreContext"
interface VideoProps {
  src: string
  width: string
  height: string
  controls?: boolean
}

const Video: React.FC<VideoProps> = props => {
  const { src, width, height, controls = false } = props

  const { state, dispatch } = useContext(StoreContext)

  const ref = useRef(null)

  useEffect(() => {
    const video = ref?.current

    // @ts-ignore: Object is possibly 'null'.
    video.currentTime = state.currentVideoTime
  }, [state.currentVideoTime])

  return (
    <video
      ref={ref}
      src={src}
      width={width}
      height={height}
      controls={controls}
      onLoadedMetadata={(e: SyntheticEvent<HTMLVideoElement>) => {
        dispatch({ type: ActionType.SET_VIDEO_DURATION, payload: e.currentTarget.duration })
        const newHeight = (state.timelineConfig.height * state.timelineConfig.minimumScale) / state.timelineConfig.minimumScaleTime
        dispatch({ type: ActionType.SET_TIMELINE_HEIGHT, payload: newHeight })
      }} />
  )
}

export default Video
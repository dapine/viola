import { SyntheticEvent, useContext, useEffect, useRef } from "react"
import { useTheme } from "styled-components"
import { ActionType } from "../store/action"
import { StoreContext } from "../store/StoreContext"
interface VideoProps {
  src: string
  width: string
  height?: string
  controls?: boolean
  onError(): any
  srcTrack?: string
}

const Video: React.FC<VideoProps> = props => {
  const { src, width, height, onError, controls = false, srcTrack } = props

  const { state, dispatch } = useContext(StoreContext)

  const ref = useRef(null)

  const theme = useTheme()

  useEffect(() => {
    const video = ref?.current

    // @ts-ignore: Object is possibly 'null'.
    video.currentTime = state.currentVideoTime
  }, [state.currentVideoTime])

  return (
    <video
      style={{ borderRadius: theme.button.shape }}
      ref={ref}
      width={width}
      height={height}
      controls={controls}
      onLoadedMetadata={(e: SyntheticEvent<HTMLVideoElement>) => {
        dispatch({ type: ActionType.SET_VIDEO_DURATION, payload: e.currentTarget.duration })
        const newHeight = (state.timelineConfig.height * state.timelineConfig.minimumScale) / state.timelineConfig.minimumScaleTime
        dispatch({ type: ActionType.SET_TIMELINE_HEIGHT, payload: newHeight })
      }}
      onError={onError}>
      <source src={src} type="video/mp4" />
      {srcTrack && <track default kind="subtitles" srcLang="en-US" label="Preview" src={'data:text/txt;base64,' + srcTrack} />}
    </video>
  )
}

export default Video
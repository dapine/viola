import { MouseEvent, useCallback, useContext, useEffect, useRef, useState, WheelEvent } from "react"
import { ActionType } from "../store/actionTypes"
import { StoreContext } from "../store/StoreContext"
import Crop from "../types/crop"
import { drawCropList, drawLineTimelinePosition, drawTimeline } from "../utils/draw"

export interface TimelineProps {
  width: number
  height: number
  minimumScale: number
  minimumScaleTime: number
  minimumScalesInLongScale: number
  lineWidth: number
  offsetLeft: number
  lineColor: string
  longLineColor: string
}

const Timeline: React.FC<TimelineProps> = props => {
  const ref = useRef(null)
  const [mouseY, setMouseY] = useState(0.0)

  const { state, dispatch } = useContext(StoreContext)

  const { width, height, minimumScale, minimumScalesInLongScale,
    minimumScaleTime, offsetLeft, lineColor, longLineColor, lineWidth } = props

  const handleWheel = (e: WheelEvent<HTMLCanvasElement>) => {
    e.preventDefault()
    const cur = minimumScale + (e.deltaY * 0.01) * -1
    const newHeight = height + (e.deltaY * 7) * -1
    dispatch({ type: ActionType.SET_TIMELINE_MINIMUM_SCALE, payload: cur })
    dispatch({ type: ActionType.SET_TIMELINE_HEIGHT, payload: newHeight })
  }

  const handleClick = () => {
    const time = mouseY / minimumScale * minimumScaleTime

    dispatch({ type: ActionType.DESELECT_ALL_CROPS })

    // "Incomplete crop" means a crop with start time only
    const hasIncompleteCrop = state.crops.some((crop: Crop) => !('end' in crop))

    // XXX: rewrite this in a more functional/immutable way
    if (hasIncompleteCrop) {
      const index = state.crops.findIndex((crop: Crop) => !('end' in crop))
      let crop: Crop = state.crops[index]

      if (time > crop.start) {
        crop.end = time
      } else {
        crop.end = crop.start
        crop.start = time
      }

      dispatch({ type: ActionType.REPLACE_CROP, payload: { index: index, crop: crop } })
    } else {
      const selected = state.crops.find((crop: Crop) => {
        return crop.start <= time && crop.end! >= time
      })

      if (selected) {
        const index = state.crops.findIndex((crop: Crop) => crop === selected)

        dispatch({ type: ActionType.SELECT_CROP, payload: index })
      } else {
        let crop: Crop = { start: time, texts: [], selected: false }
        dispatch({ type: ActionType.ADD_CROP, payload: { crop: crop } })
        const sorted = state.crops.sort((a: Crop, b: Crop) => {
          return a.start - b.start
        })
        dispatch({ type: ActionType.REPLACE_ALL_CROPS, payload: { crops: sorted } })
      }
    }

    dispatch({ type: ActionType.SET_CURRENT_VIDEO_TIME, payload: time })
  }

  const handleMouseMove = (e: MouseEvent) => {
    // @ts-ignore: Object is possibly 'null'.
    const rect = ref.current.getBoundingClientRect()
    let y = e.clientY - rect.top

    setMouseY(y)

    if (e.ctrlKey) {
      const time = mouseY / minimumScale * minimumScaleTime
      dispatch({ type: ActionType.SET_CURRENT_VIDEO_TIME, payload: time })
    }
  }

  const drawPosition = useCallback((ctx: any) => drawLineTimelinePosition(ctx, mouseY), [mouseY])

  const drawCrops = useCallback((ctx: any) =>
    drawCropList(ctx, state.crops, minimumScale, minimumScaleTime),
    [state.crops, minimumScale, minimumScaleTime])

  const draw = useCallback((ctx: any) =>
    drawTimeline(ctx, width, height, minimumScale, minimumScaleTime, minimumScalesInLongScale,
      offsetLeft, lineColor, longLineColor, lineWidth),
    [width, height, minimumScale, minimumScalesInLongScale, offsetLeft, lineColor,
      lineWidth, longLineColor, minimumScaleTime])

  useEffect(() => {
    const canvas = ref?.current
    // @ts-ignore: Object is possibly 'null'.
    const ctx = canvas.getContext('2d')

    let animationFrame: any

    const render = () => {
      draw(ctx)
      drawCrops(ctx)
      drawPosition(ctx)
      animationFrame = window.requestAnimationFrame(render)
    }
    render()

    return () => {
      window.cancelAnimationFrame(animationFrame)
    }

  }, [mouseY, drawCrops, draw, drawPosition])

  return <canvas ref={ref} {...props}
    onMouseMove={handleMouseMove}
    onWheel={handleWheel}
    onClick={handleClick}
  />
}

export default Timeline
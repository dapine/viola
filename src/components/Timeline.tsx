import { useCallback, useContext, useEffect, useRef, useState } from "react"
import { ActionType } from "../store/actionTypes"
import { StoreContext } from "../store/StoreContext"
import Crop from "../types/crop"

interface TimelineProps {
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

const formatSeconds = (value: number) => {
  let result = Math.floor(value)
  let hh =
    Math.floor(result / 3600) < 10
      ? "0" + Math.floor(result / 3600)
      : Math.floor(result / 3600)
  let mm =
    Math.floor((result / 60) % 60) < 10
      ? "0" + Math.floor((result / 60) % 60)
      : Math.floor((result / 60) % 60)
  let ss =
    Math.floor(result % 60) < 10
      ? "0" + Math.floor(result % 60)
      : Math.floor(result % 60)
  return `${hh}:${mm}:${ss}`
}

const drawLine = (ctx: any, beginX: number, beginY: number, endX: number,
  endY: number, lineColor: string, lineWidth: number) => {
  ctx.beginPath()
  ctx.moveTo(beginX, beginY)
  ctx.lineTo(endX, endY)
  ctx.strokeStyle = lineColor
  ctx.lineWidth = lineWidth
  ctx.stroke()
}

const drawSolidRect = (ctx: any, beginX: number, beginY: number, endX: number,
  endY: number, color: string) => {
  ctx.beginPath()
  for (let i = beginX; i < endX; i++) {
    ctx.moveTo(i, beginY)
    ctx.lineTo(i, endY)
  }
  ctx.strokeStyle = color
  ctx.stroke()
}

const Timeline: React.FC<TimelineProps> = props => {
  const ref = useRef(null)
  const [mouseY, setMouseY] = useState(0.0)

  const { state, dispatch } = useContext(StoreContext)

  const { width, height, minimumScale, minimumScalesInLongScale,
    minimumScaleTime, offsetLeft, lineColor, longLineColor, lineWidth } = props

  const [currentMinimumScale, setCurrentMinimumScale] = useState(minimumScale)

  const drawMousePosition = useCallback((ctx: any) => {
    drawLine(ctx, 0, mouseY, 20, mouseY, "#ff0000", 2)
  }, [mouseY])

  const drawCrops = useCallback((ctx: any) => {
    state.crops.forEach((crop: Crop) => {
      if (crop.start && crop.end) {
        const s = (crop.start * currentMinimumScale) / minimumScaleTime
        const e = (crop.end * currentMinimumScale) / minimumScaleTime

        const color = crop.selected ? "#B85C57" : "#98CE8F"

        drawSolidRect(ctx, 0, s, 15, e, color)
      }
    })
  }, [state.crops, currentMinimumScale, minimumScaleTime])

  const draw = useCallback((ctx: any) => {
    ctx.clearRect(0, 0, width, height)

    ctx.fillStyle = "#999"
    ctx.font = "12px Arial"

    const beginX = 0
    const endX = 20

    for (let i = 0; i < height; i += currentMinimumScale) {
      if (i % (currentMinimumScale * minimumScalesInLongScale) === 0) {
        drawLine(ctx, beginX, i + offsetLeft, endX, i + offsetLeft, longLineColor, lineWidth)

        const showTime = (i / currentMinimumScale) * minimumScaleTime
        ctx.fillText(formatSeconds(showTime), endX, i + offsetLeft)
      } else {
        drawLine(ctx, beginX, i + offsetLeft, 10, i + offsetLeft, lineColor, lineWidth)
      }
    }
  }, [width, height, currentMinimumScale, minimumScalesInLongScale, offsetLeft, lineColor,
    lineWidth, longLineColor, minimumScaleTime])

  useEffect(() => {
    const canvas = ref?.current
    // @ts-ignore: Object is possibly 'null'.
    const ctx = canvas.getContext('2d')

    let animationFrame: any

    const render = () => {
      draw(ctx)
      drawCrops(ctx)
      drawMousePosition(ctx)
      animationFrame = window.requestAnimationFrame(render)
    }
    render()

    return () => {
      window.cancelAnimationFrame(animationFrame)
    }

  }, [mouseY, drawCrops, draw, drawMousePosition])

  return <canvas ref={ref} {...props}
    onMouseMove={(e) => {
      // @ts-ignore: Object is possibly 'null'.
      const rect = ref.current.getBoundingClientRect()
      let y = e.clientY - rect.top

      setMouseY(y)

      if (e.ctrlKey) {
        const time = mouseY / minimumScale * minimumScaleTime
        dispatch({ type: ActionType.SET_CURRENT_VIDEO_TIME, payload: time })
      }
    }}
    onWheel={(e) => {
      e.preventDefault()
      const cur = currentMinimumScale + (e.deltaY * 0.01) * -1
      setCurrentMinimumScale(cur)
    }}
    onClick={() => {
      const time = mouseY / currentMinimumScale * minimumScaleTime

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
        }
      }

      dispatch({ type: ActionType.SET_CURRENT_VIDEO_TIME, payload: time })
    }}
  />
}

export default Timeline
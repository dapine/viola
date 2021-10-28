import { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from "react"
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
  crops: Array<Crop>
  setCrops: Dispatch<SetStateAction<Array<Crop>>>
  setVideoTime(time: number): void
}

const calc = (width: number, minimumScale: number, minimumScaleTime: number) => {
  const ticks = Math.floor(width / minimumScale)
  const duration = ticks * minimumScaleTime
  const scale = minimumScaleTime / minimumScale

  return { ticks: ticks, duration: duration, scale: scale }
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

  const { width, height, minimumScale, minimumScalesInLongScale,
    minimumScaleTime, offsetLeft, lineColor, longLineColor, lineWidth, crops, setCrops } = props

  const [currentMinimumScale, setCurrentMinimumScale] = useState(minimumScale)

  const drawMousePosition = useCallback((ctx: any) => {
    drawLine(ctx, 0, mouseY, 20, mouseY, "#ff0000", 2)
  }, [mouseY])

  const drawCrops = useCallback((ctx: any) => {
    crops.forEach((crop) => {
      if (crop.start && crop.end) {
        const s = (crop.start * currentMinimumScale) / minimumScaleTime
        const e = (crop.end * currentMinimumScale) / minimumScaleTime

        const color = crop.selected ? "#B85C57" : "#98CE8F"

        drawSolidRect(ctx, 0, s, 15, e, color)
      }
    })
  }, [crops, currentMinimumScale, minimumScaleTime])

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
        props.setVideoTime(time)
      }
    }}
    onWheel={(e) => {
      e.preventDefault()
      const cur = currentMinimumScale + (e.deltaY * 0.01) * -1
      setCurrentMinimumScale(cur)
    }}
    onClick={() => {
      const time = mouseY / currentMinimumScale * minimumScaleTime

      crops.forEach(crop => crop.selected = false)
      setCrops([...crops])

      // "Incomplete crop" means a crop with start time only
      const hasIncompleteCrop = crops.some(crop => !('end' in crop))

      if (hasIncompleteCrop) {
        const index = crops.findIndex(crop => !('end' in crop))
        let crop = crops[index]

        if (time > crop.start) {
          crops[index].end = time
        } else {
          crops[index].start = time
          crops[index].end = crop.start
        }

        setCrops([...crops])
      } else {
        const selected = crops.find(crop => {
          if (crop.start && crop.end)
            return crop.start <= time && crop.end >= time
        })

        if (selected) {
          const index = crops.findIndex(crop => crop === selected)
          crops[index].selected = true

          setCrops([...crops])
        } else {
          let crop: Crop = { start: time, texts: [], selected: false }
          setCrops([...crops, { ...crop }])
        }
      }

      props.setVideoTime(time)
    }}
  />
}

export default Timeline
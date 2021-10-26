import { useCallback, useEffect, useRef, useState } from "react"

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
  crops?: Array<Crop>
  setVideoTime(time: number): void
}

interface Crop {
  start: number
  end?: number
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
    minimumScaleTime, offsetLeft, lineColor, longLineColor, lineWidth, crops = [] } = props

  const [currentMinimumScale, setCurrentMinimumScale] = useState(minimumScale)
  const [currentCrops, setCurrentCrops] = useState(crops)

  const drawMousePosition = useCallback((ctx: any) => {
    drawLine(ctx, 0, mouseY, 20, mouseY, "#ff0000", 2)
  }, [mouseY])

  const drawCrops = useCallback((ctx: any) => {
    currentCrops.forEach((crop) => {
      if (crop.start && crop.end) {
        const s = (crop.start * currentMinimumScale) / minimumScaleTime
        const e = (crop.end * currentMinimumScale) / minimumScaleTime

        drawSolidRect(ctx, 0, s, 15, e, "#98CE8F")
      }
    })
  }, [currentCrops, currentMinimumScale, minimumScaleTime]);

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

      // "Incomplete crop" means a crop with start time only
      const hasIncompleteCrop = currentCrops.some(crop => Object.keys(crop).length !== 2)

      if (hasIncompleteCrop) {
        const index = currentCrops?.findIndex(crop => Object.keys(crop).length !== 2)
        let crop = currentCrops[index]

        if (time > crop.start) {
          currentCrops[index].end = time
        } else {
          currentCrops[index].start = time
          currentCrops[index].end = crop.start
        }
      } else {
        let crop: Crop = { start: time }
        setCurrentCrops([...currentCrops, { ...crop }])
      }

      props.setVideoTime(time)
    }}
  />
}

export default Timeline
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
}

interface Crop {
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
    minimumScaleTime, offsetLeft, lineColor, longLineColor, lineWidth } = props

  const [currentMinimumScale, setCurrentMinimumScale] = useState(minimumScale);

  const drawMousePosition = useCallback((ctx: any) => {
    drawLine(ctx, 0, mouseY, 20, mouseY, "#ff0000", 2)
  }, [mouseY]);

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
      drawMousePosition(ctx)
      animationFrame = window.requestAnimationFrame(render)
    }
    render()

    return () => {
      window.cancelAnimationFrame(animationFrame)
    }

  }, [mouseY, draw, drawMousePosition])

  return <canvas ref={ref} {...props}
    onMouseMove={(e) => {
      // @ts-ignore: Object is possibly 'null'.
      const rect = ref.current.getBoundingClientRect()
      let y = e.clientY - rect.top

      setMouseY(y)
    }}
    onWheel={(e) => {
      e.preventDefault();
      const cur = currentMinimumScale + (e.deltaY * 0.01) * -1;
      setCurrentMinimumScale(cur);
    }}
  />
}

export default Timeline
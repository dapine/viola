import Crop from "../types/crop"
import { formatSeconds } from "./utils"

export const drawLine = (ctx: any, beginX: number, beginY: number, endX: number,
  endY: number, lineColor: string, lineWidth: number) => {
  ctx.beginPath()
  ctx.moveTo(beginX, beginY)
  ctx.lineTo(endX, endY)
  ctx.strokeStyle = lineColor
  ctx.lineWidth = lineWidth
  ctx.stroke()
}

export const drawSolidRect = (ctx: any, beginX: number, beginY: number, endX: number,
  endY: number, color: string) => {
  ctx.beginPath()
  for (let i = beginX; i < endX; i++) {
    ctx.moveTo(i, beginY)
    ctx.lineTo(i, endY)
  }
  ctx.strokeStyle = color
  ctx.stroke()
}

export const drawLineTimelinePosition = (ctx: any, mouseY: number,
  beginX = 0, endX = 20, lineColor = "#ff0000", lineWidth = 2) => {
  drawLine(ctx, beginX, mouseY, endX, mouseY, lineColor, lineWidth)
}

export const drawCropList = (ctx: any, crops: Array<Crop>, minimumScale: number, minimumScaleTime: number,
  colorCrop = "#98CE8F", colorCropSelected = "#B85C57", beginX = 0, endX = 15) => {
  crops.forEach((crop: Crop) => {
    if (crop.start && crop.end) {
      const s = (crop.start * minimumScale) / minimumScaleTime
      const e = (crop.end * minimumScale) / minimumScaleTime

      const color = crop.selected ? colorCropSelected : colorCrop

      drawSolidRect(ctx, beginX, s, endX, e, color)
    }
  })
}

export const drawTimeline = (ctx: any, width: number, height: number, minimumScale: number,
  minimumScaleTime: number, minimumScalesInLongScale: number, offsetLeft: number,
  lineColor: string, longLineColor: string, lineWidth: number, beginX = 0, endX = 20,
  fillStyle = "#999", font = "12px sans-serif") => {
  ctx.clearRect(0, 0, width, height)

  ctx.fillStyle = fillStyle
  ctx.font = font

  for (let i = 0; i < height; i += minimumScale) {
    if (i % (minimumScale * minimumScalesInLongScale) === 0) {
      drawLine(ctx, beginX, i + offsetLeft, endX, i + offsetLeft, longLineColor, lineWidth)

      const showTime = (i / minimumScale) * minimumScaleTime
      ctx.fillText(formatSeconds(showTime), endX, i + offsetLeft)
    } else {
      drawLine(ctx, beginX, i + offsetLeft, 10, i + offsetLeft, lineColor, lineWidth)
    }
  }
}

export const drawTimelineTooltip = (ctx: any, mouseY: number, time: number, startX = 25,
  padding = 4, textColor = "#fff", font = "12px sans-serif", bgColor = "#2c2c2c", offsetY = 5) => {

  ctx.fillStyle = textColor
  ctx.font = font

  const fmtedTime = formatSeconds(time)

  drawSolidRect(ctx,
    startX,
    mouseY - offsetY - padding,
    startX + (12 * fmtedTime.length),
    mouseY + offsetY + padding,
    bgColor)
  ctx.fillText(fmtedTime, startX + padding, mouseY + offsetY)
}
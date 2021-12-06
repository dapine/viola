import Crop from "../types/crop"
import { formatMMSSmsms } from "../utils/utils"

export const toVttFormat = (crop: Crop, order: number): string => {
  return `${order}
${formatMMSSmsms(crop.start)} --> ${formatMMSSmsms(crop.end!)}
${crop.texts.map((text) => text.value).join('\n')}

`
}

export const toVtt = (crops: Array<Crop>): Array<string> => {
  return crops.map((crop, i) => toVttFormat(crop, i + 1))
}

export const toVttString = (crops: Array<Crop>): string => {
  return 'WEBVTT\n\n' + toVtt(crops).join('')
}
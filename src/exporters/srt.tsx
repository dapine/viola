import Crop from "../types/crop"
import { formatMiliSeconds } from "../utils/utils"

export const toSrtFormat = (crop: Crop, order: number): string => {
  return `${order}
${formatMiliSeconds(crop.start)} --> ${formatMiliSeconds(crop.end!)}
${crop.texts.map((text) => text.value).join('\n')}

`
}

export const toSrt = (crops: Array<Crop>): Array<string> => {
  return crops.map((crop, i) => toSrtFormat(crop, i+1))
}

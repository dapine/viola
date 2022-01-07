import Crop from "../types/crop"
import Text from "../types/text"
import { VariableType } from "../types/variable";
import { formatMiliSeconds } from "../utils/utils"

const applyFormatting = (text: Text): string => {
  let txt = text.value;
  text.variables.forEach((v) => {
    if (v.type === VariableType.Color) {
      txt = `<font color="${v.value}">${txt}</font>`
    }
    if (v.type === VariableType.TextFormatting && v.value !== 'default') {
      const tagMap: Record<string, string> = {
        'bold': 'b',
        'italic': 'i',
        'underline': 'u'
      }

      const tag = tagMap[v.value]

      txt = `<${tag}>${txt}</${tag}>`
    }
    if (v.type === VariableType.Position && v.value !== 'default') {
      // TODO: Top-left, top-right, middle-left, middle-center, middle-right, bottom-left, bottom-right
      const posMap: Record<string, string> = {
        'top': '{\\an8}',
        'bottom': '{\\an2}'
      }

      const pos = posMap[v.value]

      txt = `${pos}${txt}`
    }
  })

  return txt
}

export const toSrtFormat = (crop: Crop, order: number): string => {
  return `${order}
${formatMiliSeconds(crop.start)} --> ${formatMiliSeconds(crop.end!)}
${crop.texts.map((text) => applyFormatting(text)).join('\n')}

`
}

export const toSrt = (crops: Array<Crop>): Array<string> => {
  return crops.map((crop, i) => toSrtFormat(crop, i+1))
}

export const toSrtString = (crops: Array<Crop>): string => {
  return toSrt(crops).join('')
}
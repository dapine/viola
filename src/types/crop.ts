import Text from "./text"

export default interface Crop {
  start: number
  end?: number
  texts: Array<Text>
  selected: boolean
}
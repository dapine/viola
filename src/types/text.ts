import { Variable } from "./variable";

export default interface Text {
  index: number
  value: string
  variables: Array<Variable>
}
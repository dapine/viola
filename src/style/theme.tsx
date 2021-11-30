import { Shape } from "./shape";

export interface Theme {
  colors: Colors
  button: Button
}

interface Colors {
  white: string
  black: string
  gray: string
  foreground: string
  background: string
  primary: string
  secondary: string
  positive: string
  negative: string
  attention: string
}

interface Button {
  shape: Shape
}
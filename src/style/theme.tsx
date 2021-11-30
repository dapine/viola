import { Shape } from "./shape";

export interface Theme {
  colors: Colors
  button: Button
}

interface Colors {
  foreground: string
  primary: string
  secondary: string
}

interface Button {
  shape: Shape
}
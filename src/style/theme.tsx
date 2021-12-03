import { Shape } from "./shape";

export interface Theme {
  mode: ColorSchemeMode
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

export enum ColorSchemeMode {
  Light = "light",
  Dark = "dark"
}

export const defaultLightTheme: Theme = {
  mode: ColorSchemeMode.Light,
  colors: {
    white: "#fff",
    black: "#000",
    gray: "#ccc",
    foreground: "#2b2b2b",
    background: "#f2f3f8",
    primary: "#256EFF",
    secondary: "#822faf",
    positive: "#2dc653",
    negative: "#d90429",
    attention: "#FF521B",
  },
  button: {
    shape: Shape.Rounded
  }
}

export const defaultDarkTheme: Theme = {
  mode: ColorSchemeMode.Dark,
  colors: {
    ...defaultLightTheme.colors,
    foreground: defaultLightTheme.colors.background,
    background: defaultLightTheme.colors.foreground,
  },
  button: {
    shape: Shape.Rounded
  }
}
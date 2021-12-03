import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    body {
      background-color: ${props => props.theme.colors.background};
      color: ${props => props.theme.colors.foreground};
    }
    :root {
      color-scheme: ${props => props.theme.mode};
    }
  `
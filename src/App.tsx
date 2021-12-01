import "@fontsource/open-sans";
import { ToastContainer } from "react-toastify";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import "./App.css";
import Editor from "./pages/Editor";
import { StoreProvider } from "./store/StoreContext";
import { Shape } from "./style/shape";
import { ColorSchemeMode, Theme } from "./style/theme";

function App() {
  const theme: Theme = {
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

  const GlobalStyle = createGlobalStyle`
    body {
      background-color: ${props => props.theme.colors.background};
      color: ${props => props.theme.colors.foreground};
    }
    :root {
      color-scheme: ${props => props.theme.mode};
    }
  `

  return (
    <StoreProvider>
      <ThemeProvider theme={theme}>
        <Editor />

        <ToastContainer />
        <GlobalStyle />
      </ThemeProvider>
    </StoreProvider>
  )
}

export default App;

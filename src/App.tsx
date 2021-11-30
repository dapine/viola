import "@fontsource/open-sans";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "styled-components";
import "./App.css";
import Editor from "./pages/Editor";
import { StoreProvider } from "./store/StoreContext";
import { Shape } from "./style/shape";
import { Theme } from "./style/theme";

function App() {
  const theme: Theme = {
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

  return (
    <StoreProvider>
      <ThemeProvider theme={theme}>
        <Editor />

        <ToastContainer />
      </ThemeProvider>
    </StoreProvider>
  )
}

export default App;

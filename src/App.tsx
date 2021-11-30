import "./App.css";
import "@fontsource/open-sans";
import Editor from "./pages/Editor";
import { StoreProvider } from "./store/StoreContext";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "styled-components"
import { Theme } from "./style/theme";
import { Shape } from "./style/shape";

function App() {
  const theme: Theme = {
    colors: {
      foreground: "#fff",
      primary: "#256EFF",
      secondary: "#FF521B",
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

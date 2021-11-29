import "./App.css";
import "@fontsource/open-sans";
import Editor from "./pages/Editor";
import { StoreProvider } from "./store/StoreContext";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "styled-components"

function App() {
  const theme = {
    colors: {
      foreground: "#fff",
      primary: "#256EFF",
      secondary: "#FF521B",
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

import "@fontsource/open-sans";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "styled-components";
import "./App.css";
import Editor from "./pages/Editor";
import { StoreProvider } from "./store/StoreContext";
import { GlobalStyle } from "./style/globalStyle";
import { defaultLightTheme } from "./style/theme";

function App() {
  return (
    <StoreProvider>
      <ThemeProvider theme={defaultLightTheme}>
        <Editor />
        <ToastContainer />
        <GlobalStyle />
      </ThemeProvider>
    </StoreProvider>
  )
}

export default App;

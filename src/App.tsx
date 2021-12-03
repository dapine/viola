import "@fontsource/open-sans";
import { ThemeProvider } from "styled-components";
import "./App.css";
import Editor from "./pages/Editor";
import { defaultState } from "./store/reducer";
import { StoreProvider } from "./store/StoreContext";
import { GlobalStyle } from "./style/globalStyle";
import { defaultLightTheme } from "./style/theme";
import { StyledToastContainer } from "./style/toast";

function App() {
  const theme = defaultLightTheme
  const state = {
    ...defaultState,
    timelineConfig: {
      ...defaultState.timelineConfig,
      lineColor: theme.colors.foreground,
      longLineColor: theme.colors.foreground
    }
  }

  return (
    <StoreProvider initialState={{ ...state }}>
      <ThemeProvider theme={theme}>
        <Editor />
        <StyledToastContainer />
        <GlobalStyle />
      </ThemeProvider>
    </StoreProvider>
  )
}

export default App;

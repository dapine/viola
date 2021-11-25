import "./App.css";
import "@fontsource/open-sans";
import Editor from "./pages/Editor";
import { StoreProvider } from "./store/StoreContext";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <StoreProvider>
      <Editor />

      <ToastContainer />
    </StoreProvider>
  )
}

export default App;

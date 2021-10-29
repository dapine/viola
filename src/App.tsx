import "./App.css";
import Editor from "./pages/Editor";
import { StoreProvider } from "./store/StoreContext";

function App() {
  return (
    <StoreProvider>
      <Editor />
    </StoreProvider>
  )
}

export default App;

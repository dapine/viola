import Timeline from "./Timeline";

function App() {
  return <Timeline
    width={250}
    height={window.innerHeight}
    minimumScale={10}
    minimumScaleTime={1}
    minimumScalesInLongScale={10}
    lineWidth={1}
    offsetLeft={0}
    lineColor="#666"
    longLineColor="#000"
  />;
}

export default App;

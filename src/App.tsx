import HookCounter from "./components/HookCounter";
import HookCounterFour from "./components/HookCounterFour";
import HookCounterThree from "./components/HookCounterThree";
import ConditionalRender from "./components/useEffect/ConditionalRender";
import HookCounterEffect from "./components/useEffect/HookCounter";

function App() {
  return (
    <>
      {/* <HookCounter />
      <HookCounterThree />
      <HookCounterFour /> */}
      {/* <HookCounterEffect /> */}
      <ConditionalRender />
    </>
  );
}

export default App;

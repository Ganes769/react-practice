import ComponentF from "./components/context/ComponentF";
import React from "react";
import HookCounter from "./components/HookCounter";
import HookCounterFour from "./components/HookCounterFour";
import HookCounterThree from "./components/HookCounterThree";
import ConditionalRender from "./components/useEffect/ConditionalRender";
import HookCounterEffect from "./components/useEffect/HookCounter";
export const UserContext = React.createContext("test");

function App() {
  return (
    <>
      {/* <HookCounter />
      <HookCounterThree />
      <HookCounterFour /> */}
      {/* <HookCounterEffect /> */}
      {/* <ConditionalRender /> */}
      <UserContext.Provider value={"test"}>
        <ComponentF />
      </UserContext.Provider>
    </>
  );
}

export default App;

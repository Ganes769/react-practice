// import ComponentF from "./components/context/ComponentF";
// import React, { useRef } from "react";
// import HookCounter from "./components/HookCounter";
// import HookCounterFour from "./components/HookCounterFour";
// import HookCounterThree from "./components/HookCounterThree";
// import ConditionalRender from "./components/useEffect/ConditionalRender";
// import HookCounterEffect from "./components/useEffect/HookCounter";
// import Reducer from "./components/reducer/reducer";
// import Form from "./components/Form/Form";
// import InputRefAsProp, { Input } from "./components/ref/RefAsProp";
// export const UserContext = React.createContext("test");

import UseHook, { BeforUseHook } from "./components/useHook/UseHook";

function App() {
  // const ref = useRef(null);
  // const ref2 = useRef(null);
  return (
    <>
      {/* <HookCounter />
      <HookCounterThree />
      <HookCounterFour /> */}
      {/* <HookCounterEffect /> */}
      {/* <ConditionalRender /> */}
      {/* <UserContext.Provider value={"test"}>
        <ComponentF />
      </UserContext.Provider> */}
      {/* <Input label="firstname" ref={ref} />
      <InputRefAsProp label="lastname" ref={ref2} />
      <button onClick={() => ref.current?.focus()}>Focus</button>
      <button onClick={() => ref2.current?.focus()}>Focus1</button> */}
      {/* <Form /> */}
      {/* <UseHook /> */}
      {/* <BeforUseHook /> */}
      {/* <Reducer /> */}
    </>
  );
}

export default App;

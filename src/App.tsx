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

import ObjectUseState from "./components/objectUseState/ObjectUseState";
import Child from "./components/ParentandChild/Child";
import GrandParent from "./components/ParentandChild/GrandParent";
import Parent from "./components/ParentandChild/Parent";
import UseFormStatusHook from "./components/useFormStatus/UseFormStatusHook";
import UseHook, { BeforUseHook } from "./components/useHook/UseHook";
import Optimistic from "./components/useOptimistic";
import UseReducer from "./components/useReducer/UseReducer";
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
      {/* <UseFormStatusHook /> */}
      {/* <Optimistic /> */}
      {/* <UseReducer /> */}
      {/* <ObjectUseState /> */}
      // * By using children prop we can pass the child component to the parent
      //*component only the parent component will render when the parent is
      rendered.
      <GrandParent>
        <Parent>
          <Child />
        </Parent>
      </GrandParent>
    </>
  );
}

export default App;

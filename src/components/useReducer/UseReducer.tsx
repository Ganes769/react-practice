import { useReducer } from "react";
const initialState = { count: 0 };
const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    case "reset":
      return { count: 0 };
  }
};
export default function UseReducer() {
  const [state, dispatch] = useReducer(reducer, initialState);

  console.log(state?.count);
  console.log("use reducer render");
  return (
    <div>
      {/* <p>Count: {state.count}</p> */}
      <button onClick={() => dispatch({ type: "increment" })}>Increment</button>
      <button onClick={() => dispatch({ type: "decrement" })}>Decrement</button>
      <button onClick={() => dispatch({ type: "reset" })}>Reset</button>
    </div>
  );
}

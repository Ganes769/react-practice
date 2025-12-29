import { useReducer } from "react";
const initialCount = { count: 0 };

function countreducer(state = initialCount, action: any) {
  switch (action.type) {
    case "inc":
      return { count: state.count + 1 };
    case "dec":
      return { count: state.count - 1 };
  }
}
export default function Reducer() {
  const [state, dispatch] = useReducer(countreducer, initialCount as any);

  console.log(state?.count, dispatch);
  return (
    <div>
      {" "}
      <p>Count: {state?.count}</p>
      <button onClick={() => dispatch({ type: "dec" })}>-1</button>
      <button onClick={() => dispatch({ type: "inc" })}>+1</button>
      <button onClick={() => dispatch({ type: "reset" })}>Reset</button>
    </div>
  );
}

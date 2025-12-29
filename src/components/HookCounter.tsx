import { useState } from "react";

export default function HookCounter() {
  const [count, setCount] = useState(0);
  function incrementFive() {
    return setCount((prev) => prev + 5);
  }
  return (
    <div>
      <div>{count}</div>
      <button onClick={() => setCount(count + 1)}>Increment count</button>
      <button onClick={() => setCount(count - 1)}>Decrement count</button>
      <button onClick={() => setCount(0)}>Reset count</button>
      <button onClick={incrementFive}>5 inc count</button>
    </div>
  );
}

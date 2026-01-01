import React, { useState } from "react";

export default function GrandParent({
  children,
}: {
  children: React.ReactNode;
}) {
  const [count, setCount] = useState(0);

  console.log("grand parent component render");
  return (
    <div>
      {" "}
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
      <button onClick={() => setCount(0)}>Reset</button>
      {children}
    </div>
  );
}

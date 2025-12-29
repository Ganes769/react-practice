import { useEffect, useState } from "react";

export default function ConditionalRender() {
  const [name, setName] = useState("");
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("useffeect render");

    document.title = ` clicked ${count} times`;
  }, [count]);
  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={() => setCount(count + 1)}>clicked {count} times</button>
    </div>
  );
}

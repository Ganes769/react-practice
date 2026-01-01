import { useState } from "react";

const Parent = ({ children }: { children: React.ReactNode }) => {
  const [count, setCount] = useState(0);
  console.log("parent component render");
  return <div>{children}</div>;
};

export default Parent;

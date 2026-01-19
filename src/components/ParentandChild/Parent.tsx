const Parent = ({ children }: { children: React.ReactNode }) => {
  console.log("parent component render");
  return <div>{children}</div>;
};

export default Parent;

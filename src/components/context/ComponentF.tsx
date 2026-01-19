import { UserContext } from "./UserContext";

export default function ComponentF() {
  return (
    <div>
      <UserContext.Consumer>
        {(user: string) => {
          return <div>user context value {user}</div>;
        }}
      </UserContext.Consumer>
    </div>
  );
}

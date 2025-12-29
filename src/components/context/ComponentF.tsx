import { UserContext } from "../../App";

export default function ComponentF() {
  return (
    <div>
      <UserContext.Consumer>
        {(user) => {
          return <div>user context value {user}</div>;
        }}
      </UserContext.Consumer>
    </div>
  );
}

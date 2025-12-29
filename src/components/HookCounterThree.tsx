import { useState } from "react";

export default function HookCounterThree() {
  interface Name {
    firstName?: string;
    lastName?: string;
  }
  const initValue: Name = {
    firstName: "",
    lastName: "",
  };
  const [name, setName] = useState(initValue);
  console.log(name);
  return (
    <div>
      <form
        action="
    "
      >
        <input
          type="text"
          value={name.firstName}
          onChange={(e) => setName({ ...name, firstName: e.target.value })}
        />
        <input
          value={name.lastName}
          onChange={(e) => setName({ ...name, lastName: e.target.value })}
          type="text"
        />
        <h2>
          your firstname is {name.firstName} and lastname is {name.lastName}
        </h2>
      </form>
    </div>
  );
}

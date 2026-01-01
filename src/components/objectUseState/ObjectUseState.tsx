import React, { useState } from "react";

export default function ObjectUseState() {
  const initState = {
    fname: "jhon",
    lastname: "doe",
  };
  const [person, setperson] = useState(initState);
  const handlePersonChange = () => {
    const newPerson = { ...person };
    newPerson.fname = "jane";
    newPerson.lastname = "doe";
    setperson(newPerson);
  };
  console.log("render");
  return (
    <div>
      <button onClick={handlePersonChange}>
        {person.fname} {person.lastname}
      </button>
    </div>
  );
}

"use client";

import { use, useState, useEffect } from "react";
const fetchUser = fetch("https://jsonplaceholder.typicode.com/users").then(
  (res) => res.json()
);

// using use() hook for fetcjing data
export default function UseHook() {
  const users = use(fetchUser);
  console.log(users);

  return (
    <div>
      <h2>Users</h2>
      <ul>
        {users.map((user: any) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}

// !before use() hook use hook reduce the number of re-renders and make the code more readable and maintainable as well as reduce the code complexity.

export function BeforUseHook() {
  const [user, setuser] = useState([]);

  useEffect(() => {
    const fetchuser = async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      const data = await response.json();
      setuser(data);
    };
    fetchuser();
  });
  return (
    <div>
      <h2>Users</h2>
      <ul>
        {user.map((user: any) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}

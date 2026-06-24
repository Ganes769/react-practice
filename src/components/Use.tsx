import { use } from "react";

type RandomUser = {
  name: {
    first: string;
    last: string;
  };
  email: string;
};

type RandomUserResponse = {
  results: RandomUser[];
};

async function fetchUser() {
  const result = await fetch("/random-user-api/api/");
  if (!result.ok) {
    throw new Error(`Request failed with status ${result.status}`);
  }

  const data = (await result.json()) as RandomUserResponse;
  return data.results[0];
}

const userPromise = fetchUser();

export default function UseHookTest() {
  const user = use(userPromise);

  return (
    <div>
      <h1>User</h1>
      <p>
        {user.name.first} {user.name.last}
      </p>
      <p>{user.email}</p>
    </div>
  );
}

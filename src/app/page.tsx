import { Key } from "react";

type User = { id: Key | null | undefined; name: string };
type Data = { users: User[] };


interface HomeProps {
  users: Record<string, string>[];
}


export default async function Home() {
  let users;
  try {
    const response = await fetch(
      "https://genuine-pegasus-34.hasura.app/v1/graphql",
      {
        method: "POST",
        headers: {
          "x-hasura-admin-secret":
            "lguuBuAMyVbQITmkq5oK3AbzLL17KJtrscmdAqhnqpWbcaBHwEFnmSNVJnwVL1fm",
        },
        body: JSON.stringify({
          query: `query @cached(ttl: 60){
          users{
            name
          }
        }`,
        }),
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const result = await response.json();
    const data = result.data as Data;

    users = data?.users;
  } catch (error) {
    console.error("Fetch Error:", error);
  }
  console.log(users);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        {users?.map((user) => (
          <p key={user.name}>{user.name}</p>
        ))}
      </div>
    </main>
  );
};



import {
  InferGetServerSidePropsType,
  GetServerSideProps,
  NextPage,
} from "next";
import { Key } from "react";


export const Home = async () => {
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
          query: `query{
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
    const data = result.data;

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

export default Home;

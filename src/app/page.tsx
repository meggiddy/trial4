import { GetStaticProps, GetStaticPaths, GetServerSideProps } from "next";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex"></div>
    </main>
  );
}
export const getServerSideProps: GetServerSideProps = async (context) => {
  let users;
  try {
    const response = await fetch(
      "https://genuine-pegasus-34.hasura.app/v1/graphql",
      {
        method: "GET",
        headers: {
          "x-hasura-admin-secret":
            "lguuBuAMyVbQITmkq5oK3AbzLL17KJtrscmdAqhnqpWbcaBHwEFnmSNVJnwVL1fm",
        },
        body: JSON.stringify({
          query: `query{
          user{
            name
          }
        }`,
        }),
      }
    );
    const result  = await response.json();
    const data = result.data;
    users = data.user;
  } catch (e) {
    console.log(e);
  }
  return {
    props: { users },
  };
};

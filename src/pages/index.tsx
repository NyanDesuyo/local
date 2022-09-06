import type { NextPage } from "next";

import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const helloQuery = trpc.useQuery([
    "hello.hello",
    {
      text: "Cocopod",
    },
  ]);

  if (helloQuery.isLoading) {
    return (
      <div>
        <p>Loading....</p>
      </div>
    );
  }

  if (helloQuery.isError) {
    return (
      <div>
        <p>Something went Wrong, check Project</p>
      </div>
    );
  }

  return (
    <div>
      <h1>This is from TRPC:</h1>
      <p>{helloQuery.data?.message}</p>
    </div>
  );
};

export default Home;

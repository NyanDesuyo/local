import type { NextPage } from "next";

import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const getAllQuery = trpc.useQuery([
    "post.detail",
    {
      id: "this is id",
    },
  ]);

  if (getAllQuery.isLoading) {
    return (
      <div className="h-screen w-screen flex flex-col justify-center">
        <p className="text-center">Loading....</p>
      </div>
    );
  }

  if (getAllQuery.isError) {
    return (
      <div className="h-screen w-screen flex flex-col justify-center">
        <p className="text-center">Something went Wrong, check Project</p>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen flex flex-col justify-center">
      <h1 className="text-center">This is from TRPC:</h1>
      <p className="text-center">{getAllQuery.data?.message}</p>
      <p className="text-center">{JSON.stringify(getAllQuery.data?.data)}</p>
    </div>
  );
};

export default Home;

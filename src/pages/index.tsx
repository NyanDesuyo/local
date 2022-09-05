import type { NextPage } from "next";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const helloQuery = trpc.useQuery(["hello", { text: "client" }]);

  if (!helloQuery.data) {
    return (
      <div>
        <h1 className="text-3xl font-bold underline">Loading</h1>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold underline">Hello World!</h1>
      <p>{helloQuery.data.greeting}</p>
    </div>
  );
};

export default Home;

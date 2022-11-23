import type { NextPage } from "next";
import Link from "next/link";

import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const { data, isError, isLoading } = trpc.useQuery(["post.all"]);

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex flex-col justify-center">
        <p className="text-center">Loading....</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="h-screen w-screen flex flex-col justify-center">
        <p className="text-center">Something went Wrong, check Project</p>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen flex flex-col justify-center">
      <Link href={"/post"} className="content-center">
        Post!
      </Link>
      <br />
      <h1 className="text-center">This is from TRPC:</h1>
      <p className="text-center">{data?.message}</p>
      <br />
      {data?.result.map(
        ({ id, docid, create_at, update_at, title, body, isPosted }, index) => {
          return (
            <div className="text-center" key={docid}>
              <p className="">No: {index + 1}</p>
              <br />
              <p className="">Create At: {create_at.toString()}</p>
              <p className="">Update At: {update_at.toString()}</p>
              <br />
              <p className="">Title: {title}</p>
              <p className="">Body: {body}</p>
              <p className="">Posted: {isPosted ? "✔" : "❌"}</p>
              <br />
            </div>
          );
        }
      )}
    </div>
  );
};

export default Home;

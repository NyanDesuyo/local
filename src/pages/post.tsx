import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

import { trpc } from "../utils/trpc";
import { CreatePostSchema } from "../schema/post.schema";

const Post: NextPage = () => {
  const router = useRouter();

  const { handleSubmit, register } = useForm<CreatePostSchema>();

  const { mutate, error } = trpc.useMutation(["post.create"], {
    // onError: (e) => {},
    onSuccess: () => {
      router.push("/");
    },
  });

  function onSubmit(values: CreatePostSchema) {
    mutate(values);
  }

  return (
    <div className="h-screen w-screen flex flex-col justify-center">
      <form className="text-center" onSubmit={handleSubmit(onSubmit)}>
        {error && error.message}
        <h1>Create Post</h1>
        <input type="text" placeholder="Title" {...register("title")} />
        <br />
        <input type="text" placeholder="Body" {...register("body")} />
        <br />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Post!
        </button>
      </form>
    </div>
  );
};

export default Post;

import { z } from "zod";

import { createRouter } from "../createRouter";

export const helloRouter = createRouter().query("hello", {
  input: z.object({
    text: z.string().nullish(),
  }),
  async resolve({ input }) {
    return {
      message: `Hello, ${input?.text ?? "default"}`,
    };
  },
});

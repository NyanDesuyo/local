import { z } from "zod";

import { createRouter } from "../createRouter";

export const postRouter = createRouter()
  .query("all", {
    async resolve({ input }) {
      return {
        message: `All Posts`,
      };
    },
  })
  .query("detail", {
    input: z.object({
      id: z.string().trim(),
    }),
    async resolve({ input }) {
      return {
        message: `Selected Post`,
        data: input,
      };
    },
  })
  .mutation("create", {
    input: z.object({
      title: z.string(),
      body: z.string(),
      isPosted: z.boolean(),
    }),
    async resolve({ input }) {
      return {
        message: `Create Post`,
        data: input,
      };
    },
  })
  .mutation("update", {
    input: z.object({
      id: z.string(),
      title: z.optional(z.string()),
      body: z.optional(z.string()),
      isPosted: z.optional(z.boolean()),
    }),
    async resolve({ input }) {
      return {
        message: `Update Post`,
        data: input,
      };
    },
  })
  .mutation("delete", {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ input }) {
      return {
        message: `Delete Post`,
        data: input,
      };
    },
  });

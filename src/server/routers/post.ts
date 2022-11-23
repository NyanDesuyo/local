import * as trpc from "@trpc/server";

import { createRouter } from "../createRouter";
import {
  detailPostSchema,
  createPostSchema,
  updatePostSchema,
  deletePostSchema,
} from "../../schema/post.schema";

export const postRouter = createRouter()
  .query("all", {
    async resolve({ input, ctx }) {
      try {
        const result = await ctx.prismaClient.post.findMany({});
        return {
          message: `All Posts`,
          result,
        };
      } catch (error) {
        throw new trpc.TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went Wrong",
        });
      }
    },
  })
  .query("detail", {
    input: detailPostSchema,
    async resolve({ input, ctx }) {
      const { docid } = input;

      try {
        const result = await ctx.prismaClient.post.findUnique({
          where: {
            docid,
          },
        });

        return {
          message: `Selected Post`,
          result,
        };
      } catch (error) {
        throw new trpc.TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went Wrong",
        });
      }
    },
  })
  .mutation("create", {
    input: createPostSchema,
    async resolve({ input, ctx }) {
      const { title, body, isPosted } = input;

      try {
        const result = await ctx.prismaClient.post.create({
          data: {
            title,
            body,
            isPosted,
          },
        });

        return {
          message: `Create Post`,
          result,
        };
      } catch (error) {
        throw new trpc.TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went Wrong",
        });
      }
    },
  })
  .mutation("update", {
    input: updatePostSchema,
    async resolve({ input, ctx }) {
      const { docid, title, body, isPosted } = input;

      try {
        const result = await ctx.prismaClient.post.update({
          where: {
            docid,
          },
          data: {
            title,
            body,
            isPosted,
          },
        });

        return {
          message: `Update Post`,
          result,
        };
      } catch (error) {
        throw new trpc.TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went Wrong",
        });
      }
    },
  })
  .mutation("delete", {
    input: deletePostSchema,
    async resolve({ input, ctx }) {
      const { docid } = input;
      try {
        const result = await ctx.prismaClient.post.delete({
          where: {
            docid,
          },
        });

        return {
          message: `Delete Post`,
          result,
        };
      } catch (error) {
        throw new trpc.TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went Wrong",
        });
      }
    },
  });

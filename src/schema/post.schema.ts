import { z } from "zod";

export const detailPostSchema = z.object({
  docid: z.string().uuid(),
});

export type DetailPostSchema = z.TypeOf<typeof detailPostSchema>;

export const createPostSchema = z.object({
  title: z.string(),
  body: z.string(),
  isPosted: z.optional(z.boolean()).default(true),
});

export type CreatePostSchema = z.TypeOf<typeof createPostSchema>;

export const updatePostSchema = z.object({
  docid: z.string().uuid(),
  title: z.optional(z.string()),
  body: z.optional(z.string()),
  isPosted: z.optional(z.boolean()),
});

export type UpdatePostSchema = z.TypeOf<typeof updatePostSchema>;

export const deletePostSchema = z.object({
  docid: z.string().uuid(),
});

export type DeletePostSchema = z.TypeOf<typeof deletePostSchema>;

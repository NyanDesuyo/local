import { createRouter } from "../createRouter";
import { helloRouter } from "./hello";
import { postRouter } from "./post";

export const appRouter = createRouter()
  .merge("hello.", helloRouter)
  .merge("post.", postRouter);

export type AppRouter = typeof appRouter;

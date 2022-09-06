import { z } from "zod";

import { createRouter } from "../createRouter";

export const postRouter = createRouter().query("all", {
  async resolve({ input }) {
    return {
      message: `Return all Post`,
    };
  },
});

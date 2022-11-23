import { NextApiRequest, NextApiResponse } from "next";
import { prismaClient } from "../utils/prisma";

export function createContext({
  req,
  res,
}: {
  req: NextApiRequest;
  res: NextApiResponse;
}) {
  return { req, res, prismaClient };
}

export type Context = ReturnType<typeof createContext>;

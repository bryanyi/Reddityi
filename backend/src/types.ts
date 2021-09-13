import { Redis } from "ioredis";
import { Request, Response } from "express";
import { SessionData, Session } from "express-session";
import { createUpVoteLoader } from "./utils/createUpVoteLoader";
import { createUserLoader } from "./utils/createUserLoader";

export type MyContext = {
  req: Request & {
    session: Session & Partial<SessionData> & { userId?: number };
  };
  res: Response;
  redis: Redis;
  userLoader: ReturnType<typeof createUserLoader>;
  upvoteLoader: ReturnType<typeof createUpVoteLoader>;
};

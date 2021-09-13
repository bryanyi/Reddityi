import { ApolloServer } from "apollo-server-express";
import connectRedis from "connect-redis";
import cors from "cors";
import express from "express";
import session from "express-session";
import Redis from "ioredis";
import path from "path";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import { COOKIE_NAME, __prod__ } from "./constants";
import { Post } from "./entities/Post";
import { UpVote } from "./entities/UpVote";
import { User } from "./entities/User";
import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/Post";
import { UserResolver } from "./resolvers/User";
import { createUpVoteLoader } from "./utils/createUpVoteLoader";
import { createUserLoader } from "./utils/createUserLoader";

const main = async () => {
  await createConnection({
    type: "postgres",
    database: "reddityi2",
    username: "postgres",
    password: "postgres",
    logging: true,
    synchronize: true, // good for development
    migrations: [path.join(__dirname, "./migrations/*")],
    entities: [Post, User, UpVote],
  });

  // await conn.runMigrations();
  // await Post.delete({});

  const app = express();

  const RedisStore = connectRedis(session);
  const redis = new Redis();

  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );

  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({
        client: redis,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
        httpOnly: true,
        sameSite: "lax", // csrf
        secure: __prod__, // cookie only works in http
      },
      saveUninitialized: false,
      secret: "argnouilaernluiaernvliaunerviuop",
      resave: false,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, PostResolver, UserResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({
      req,
      res,
      redis,
      userLoader: createUserLoader(),
      upvoteLoader: createUpVoteLoader(),
    }), // context runs on every request. the createUserLoader function will batch and cache loading of users in a single request.
  });

  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(4000, () => {
    console.log("Reddityi server started on localhost:4000");
  });
};

main().catch((err) => {
  console.error(err);
});

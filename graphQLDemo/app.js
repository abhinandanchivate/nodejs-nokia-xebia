import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { expressMiddleware } from "@apollo/server/express4";
import { getUserFromToken } from "./middleware/authMiddleware.js";
import logger from "./middleware/logMiddleware.js";
import Role from "./models/Rolemodel.js";
import rootRouter from "./routers/rootRouter.js";
console.log("before db in app");
export async function configureApp(apolloServer) {
  const app = express();

  app.use(express.json());
  app.use("/api/v1", rootRouter);
  app.use(
    "/api/graphql",
    cors(),
    bodyParser.json(),
    expressMiddleware(apolloServer, {
      context: async ({ req }) => {
        const user = getUserFromToken(req);
        console.log("user details from token" + user);

        if (user) {
          const roleDoc = await Role.findById(user.role).lean();
          user.roleName = roleDoc?.name;
        }
        return { user };
      },
    })
  );

  return app;
}

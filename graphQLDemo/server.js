// ✅ server.js
import { ApolloServer } from "@apollo/server";
import connectDB from "./config/db.config.js";
import logger from "./middleware/logMiddleware.js";

// ✅ 1. Wait for DB connection FIRST
await connectDB(); // Must complete BEFORE importing anything else

// ✅ 2. THEN import schema + app
const { graphqlSchema } = await import("./schemas/autoSchema.js");
const { configureApp } = await import("./app.js");

// ✅ 3. Start Apollo Server
const server = new ApolloServer({ schema: graphqlSchema });
await server.start();

const app = await configureApp(server);
app.listen(4000, () => {
  logger.info(`🚀 Server ready at http://localhost:4000/graphql`);
});

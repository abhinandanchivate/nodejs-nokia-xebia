import { ApolloServer } from "@apollo/server";
import { graphqlSchema } from "./graphql/schema/autoSchema.js";
import { configureApp } from "./app.js";
import { connectToDatabase } from "./utils/db.config.js";
import logger from "./middleware/logMiddleware.js";

const server = new ApolloServer({ schema: graphqlSchema });
await server.start();

const app = await configureApp(server);
await connectToDatabase();

app.listen(4000, () => {
  logger.info(`Server ready at http://localhost:4000/graphql`);
});

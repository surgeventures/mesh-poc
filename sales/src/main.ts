import { createServer } from "node:http";
import { createYoga } from "graphql-yoga";
import { schema } from "./schema";

const yoga = createYoga({ schema });

const server = createServer(yoga);

server.listen(3003, () => {
  console.info("Server is running on http://localhost:3003/graphql");
});

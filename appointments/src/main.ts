import "dd-trace/init";
import { createServer } from "node:http";
import { createYoga } from "graphql-yoga";
import { schema } from "./schema";

const yoga = createYoga({ schema });

const server = createServer(yoga);

server.listen(3001, () => {
  console.info("Server is running on http://localhost:3001/graphql");
});

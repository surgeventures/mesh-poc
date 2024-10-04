import "dd-trace/init";
import { createServer } from "node:http";
import { createYoga, type Plugin } from "graphql-yoga";
import { schema } from "./schema";

function useDebug(): Plugin {
  return {
    onParse: ({ context }) => {
      console.debug(context.params);
    },
  };
}

const yoga = createYoga({ schema, logging: "debug", plugins: [useDebug()] });

const server = createServer(yoga);

server.listen(3002, () => {
  console.info("Server is running on http://localhost:3002/graphql");
});

import "dd-trace/init";
import { createServer } from "node:http";
import { inspect } from "node:util";
import { createYoga, Plugin } from "graphql-yoga";
import { schema } from "./schema";

function useDebug(): Plugin {
  return {
    onParse: ({ context }) => {
      console.debug(inspect(context.params, false, null, true));
    },
  };
}

const yoga = createYoga({
  schema,
  logging: "debug",
  plugins: [useDebug()],
  graphiql: { title: "Sales API" },
});

const server = createServer(yoga);

server.listen(3003, () => {
  console.info("Server is running on http://localhost:3003/graphql");
});

import "dd-trace/init";
import { createServer } from "node:http";
import { inspect } from "node:util";
import { createYoga, Plugin } from "graphql-yoga";
import { useServer } from "graphql-ws/lib/use/ws";
import { WebSocketServer } from "ws";
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
  graphiql: {
    subscriptionsProtocol: "WS",
  },
});

const server = createServer(yoga);

const wsServer = new WebSocketServer({
  server: server,
  path: yoga.graphqlEndpoint,
});

useServer(
  {
    execute: (args: any) => args.rootValue.execute(args),
    subscribe: (args: any) => args.rootValue.subscribe(args),
    onSubscribe: async (ctx, msg) => {
      const { schema, execute, subscribe, contextFactory, parse, validate } =
        yoga.getEnveloped({
          ...ctx,
          req: ctx.extra.request,
          socket: ctx.extra.socket,
          params: msg.payload,
        });

      const args = {
        schema,
        operationName: msg.payload.operationName,
        document: parse(msg.payload.query),
        variableValues: msg.payload.variables,
        contextValue: await contextFactory(),
        rootValue: {
          execute,
          subscribe,
        },
      };

      const errors = validate(args.schema, args.document);
      if (errors.length) return errors;
      return args;
    },
  },
  wsServer
);

server.listen(3001, () => {
  console.info("Server is running on http://localhost:3001/graphql");
});

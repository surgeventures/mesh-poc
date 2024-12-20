import "dd-trace/init";
import { createServer } from "node:http";
import { inspect } from "node:util";
import { createYoga, Plugin } from "graphql-yoga";
import { schema } from "./schema";
import util from "node:util";
import { exec as execCallback } from "node:child_process";

const exec = util.promisify(execCallback);

setInterval(async () => {
  const { stdout, stderr } = await exec("ss -natp");
  console.log("stdout:", stdout);
  console.log("stderr:", stderr);
}, 1000);

function useDebug(): Plugin {
  return {
    onParse: ({ context }) => {
      console.debug("onParse context params");
      console.debug(inspect(context.params, false, null, true));
    },
  };
}

const yoga = createYoga({
  schema,
  logging: "debug",
  plugins: [useDebug()],
  graphiql: { title: "Appointments API" },
});

const server = createServer(yoga);

server.listen(3001, () => {
  console.info("Server is running on http://localhost:3001/graphql");
});

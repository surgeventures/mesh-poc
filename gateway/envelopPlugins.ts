import { Plugin } from "@envelop/core";
import tracer from "dd-trace";
import { useOnResolve } from "@envelop/on-resolve";
import { print } from "graphql";

tracer.init();

function useDatadog(): Plugin {
  return {
    onPluginInit({ addPlugin }) {
      addPlugin(
        useOnResolve(({ info, resolver, replaceResolver }) => {
          const instrumentedResolver = tracer.wrap(
            "graphql.resolve",
            { resource: info.fieldName, type: "graphql" },
            resolver
          );
          replaceResolver(instrumentedResolver);
        })
      );
    },
    onExecute({ args, executeFn, setExecuteFn }) {
      const instrumentedExecute = tracer.wrap(
        "graphql.execute",
        {
          resource: print(args.document).replace(/\s+/g, " "),
        },
        executeFn
      );
      setExecuteFn(instrumentedExecute);
    },
  };
}

const plugins: Plugin[] = [useDatadog()];

export default plugins;

import { Plugin } from "@envelop/core";
import tracer from "dd-trace";
import { useOnResolve } from "@envelop/on-resolve";
import { print } from "graphql";
import { MeshPlugin } from "@graphql-mesh/types";

function useDatadog(): Plugin & MeshPlugin<any> {
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
    onFetch({ options }) {
      console.log({ options });
      const currentSpan = tracer.scope().active();

      if (currentSpan) {
        options.headers ||= {};
        tracer.inject(currentSpan, "http_headers", options.headers);
      }
    },
  };
}

const plugins: Plugin[] = [useDatadog()];

export default plugins;

import { defineConfig } from "@graphql-hive/gateway";

export const gatewayConfig = defineConfig({
  supergraph: "./supergraph.graphql",
  batching: {
    limit: 5,
  },
});

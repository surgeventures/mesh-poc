import { createOtlpGrpcExporter, defineConfig } from "@graphql-hive/gateway";

export const gatewayConfig = defineConfig({
  supergraph: "./supergraph.graphql",
  batching: {
    limit: 5,
  },
  maskedErrors: false,
  openTelemetry: {
    serviceName: "gateway-poc",
    exporters: [
      createOtlpGrpcExporter({
        url: "http://0.0.0.0:4317",
      }),
    ],
  },
});

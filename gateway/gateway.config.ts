import {
  createOtlpGrpcExporter,
  createRemoteJwksSigningKeyProvider,
  defineConfig,
  extractFromHeader,
} from "@graphql-hive/gateway";

export const gatewayConfig = defineConfig({
  supergraph: "./supergraph.graphql",
  graphiql: { title: "API Gateway" },
  batching: {
    limit: 5,
  },
  maskedErrors: false,
  openTelemetry: {
    serviceName: "gateway-poc",
    exporters: [
      createOtlpGrpcExporter({
        url:
          process.env.OPENTELEMETRY_COLLECTOR_ENDPOINT || "http://0.0.0.0:4317",
      }),
    ],
  },
  jwt: {
    singingKeyProviders: [
      createRemoteJwksSigningKeyProvider({
        jwksUri: process.env.JWKS_URI || "http://localhost:3004/jwks",
      }),
    ],
    reject: {
      invalidToken: true,
      missingToken: false,
    },
    forward: {
      payload: true,
      token: true,
      extensionsFieldName: "jwt",
    },
    tokenLookupLocations: [extractFromHeader({ name: "x-jwt" })],
  },
});

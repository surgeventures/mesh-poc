import {
  createOtlpGrpcExporter,
  createRemoteJwksSigningKeyProvider,
  defineConfig,
  extractFromHeader,
  WSTransportOptions,
} from "@graphql-hive/gateway";

export const gatewayConfig = defineConfig({
  supergraph: "./supergraph.graphql",
  transportEntries: {
    "*": {
      options: {
        subscriptions: {
          kind: "ws",
        },
      },
    },
  },
  graphiql: {
    subscriptionsProtocol: "WS",
    title: "API Gateway",
  },
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
  jwt: {
    singingKeyProviders: [
      createRemoteJwksSigningKeyProvider({
        jwksUri: "http://localhost:3004/jwks",
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

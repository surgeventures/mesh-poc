import { YamlConfig } from "@graphql-mesh/types";

const config: YamlConfig.Config = {
  serve: {
    port: 3000,
  },
  sources: [
    {
      name: "Appointments",
      handler: {
        openapi: {
          endpoint: "http://localhost:3001/",
          source: "http://localhost:3001/api-json",
        },
      },
      transforms: [
        {
          prefix: {
            mode: "bare",
          },
        },
      ],
    },
    {
      name: "Customers",
      handler: {
        grpc: {
          endpoint: "0.0.0.0:3002",
          source: "../customers/src/customers/customers.proto",
          prefixQueryMethod: ["find"],
        },
      },
    },
    {
      name: "Sales",
      handler: {
        graphql: {
          endpoint: "http://localhost:3003/graphql",
        },
      },
    },
  ],
  additionalTypeDefs: `
    extend type Appointments_Appointment {
      customer: customers__Customer
    }
  `,
  additionalEnvelopPlugins: "./envelopPlugins.ts",
  additionalResolvers: ["./services/appointments/appointmentsResolver.ts"],
  documents: ["../fresha/app/**/*.tsx"],
};

export default config;

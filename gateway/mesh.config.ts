import {
  defineConfig,
  loadGraphQLHTTPSubgraph,
} from "@graphql-mesh/compose-cli";

export const composeConfig = defineConfig({
  subgraphs: [
    {
      sourceHandler: loadGraphQLHTTPSubgraph("Appointments", {
        endpoint:
          process.env.APPOINTMENTS_API_URL || "http://localhost:3001/graphql",
        source: "./schemas/Appointments.graphql",
      }),
    },
    {
      sourceHandler: loadGraphQLHTTPSubgraph("Customers", {
        endpoint:
          process.env.CUSTOMERS_API_URL || "http://localhost:3002/graphql",
      }),
    },
    {
      sourceHandler: loadGraphQLHTTPSubgraph("Sales", {
        endpoint: process.env.SALES_API_URL || "http://localhost:3003/graphql",
      }),
    },
  ],
  additionalTypeDefs: /* GraphQL */ `
    extend type Appointment {
      customer: Customer!
        @resolveTo(
          sourceName: "Customers"
          sourceTypeName: "Query"
          sourceFieldName: "customersByIds"
          keyField: "customerId"
          keysArg: "ids"
          requiredSelectionSet: "{ customerId }"
        )
      sales: [Sale!]!
        @resolveTo(
          sourceName: "Sales"
          sourceTypeName: "Query"
          sourceFieldName: "salesByAppointmentId"
          requiredSelectionSet: "{ id }"
          sourceArgs: { appointmentId: "{root.id}" }
        )
    }
  `,
});

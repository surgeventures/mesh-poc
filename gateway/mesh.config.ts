import {
  defineConfig,
  loadGraphQLHTTPSubgraph,
} from "@graphql-mesh/compose-cli";

export const composeConfig = defineConfig({
  subgraphs: [
    {
      sourceHandler: loadGraphQLHTTPSubgraph("Appointments", {
        endpoint: "http://localhost:3001/graphql",
      }),
    },
    {
      sourceHandler: loadGraphQLHTTPSubgraph("Customers", {
        endpoint: "http://localhost:3002/graphql",
      }),
    },
    {
      sourceHandler: loadGraphQLHTTPSubgraph("Sales", {
        endpoint: "http://localhost:3003/graphql",
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

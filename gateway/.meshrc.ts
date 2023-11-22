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
          endpoint: "localhost:3002",
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
      customer: customers__Customer @resolveTo(
        sourceName: "Customers",                                
        sourceTypeName: "Query",                               
        sourceFieldName: "customers_CustomersService_FindOneByAppointmentId",
        requiredSelectionSet: "{ id }", # This does not seem to be doing anything              
        sourceArgs: {                                         
          input: {
            appointmentId: "{root.id}"
          }
        }
    )
    }
  `,
  documents: ["./documents/*.graphql"],
};

export default config;

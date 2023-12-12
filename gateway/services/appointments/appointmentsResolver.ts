import { print } from "graphql";
import { Resolvers, Query } from "../../.mesh";

const appointmentsResolver: Resolvers = {
  Appointments_Appointment: {
    customer: {
      selectionSet: `{ customerId }`,
      resolve: async (root, args, context, info) =>
        context.Customers.Query.customers_CustomersService_FindMany({
          root,
          context,
          info,
          argsFromKeys: (keys: number[]) => {
            return {
              input: {
                ids: keys,
              },
            };
          },
          valuesFromResults: (
            values: Query["customers_CustomersService_FindMany"],
          ) => {
            return values.customers;
          },
          key: root.customerId,
          selectionSet: (userSelectionSet) => /* GraphQL */ `
              {
                  customers ${print(userSelectionSet)}
              }
          `,
        }),
    },
  },
};

export default appointmentsResolver;

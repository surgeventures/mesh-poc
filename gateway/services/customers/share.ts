import { Query } from "../../.mesh";
import { exposeBatch } from "../../enmesh";

export const customersBatched = exposeBatch({
  // Source will call context.Customers.Query.customers_CustomersService_FindMany
  sourceName: "Customers",
  sourceTypeName: "Query",
  sourceFieldName: "customers_CustomersService_FindMany",
  keyField: "customerId",
  keysArg: "input.ids",
  additionalArgs: {},
  typeName: "customers__Customer", // What will be the result type be
  result: "customers", // This is how the data will be extracted from the customers_CustomersService_FindMany returned data
});

/*
Example:
  connect("targetTypeName", "targetFieldName", customersBatched),

  Will extend graphql like this:

  Query {
    targetTypeName {
       targetFieldName: customers__Customer
    }
  }

  When this node is requested, it will be resolved here:
  https://github.com/ardatan/graphql-mesh/blob/329192251a5eead9a7eed542a8446aed90b7fbdf/packages/utils/src/resolve-additional-resolvers.ts#L54
 */

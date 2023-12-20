import { Query } from "../../.mesh";
import { exposeBatch } from "../../enmesh";

export const customersBatched = exposeBatch({
  sourceFieldName: "customers_CustomersService_FindMany",
  sourceSelectionSet: ``,
  requiredSelectionSet: `{ customerId }`,
  keyField: "customerId",
  keysArg: "input.ids",
  additionalArgs: {},
  sourceTypeName: "Query",
  sourceName: "Customers",
  typeName: "customers__Customer",
  result: "customers",
});

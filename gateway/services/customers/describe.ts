import { describe } from "../../enmesh";

export const service = describe({
  name: "Customers",
  handler: {
    grpc: {
      endpoint: "localhost:3002",
      source: "../customers/src/customers/customers.proto",
      prefixQueryMethod: ["find"],
    },
  },
});

import { describe } from "../../enmesh";

export const service = describe({
  name: "Sales",
  handler: {
    graphql: {
      endpoint: "http://localhost:3003/graphql",
    },
  },
});

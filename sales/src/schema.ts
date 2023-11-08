import { createSchema } from "graphql-yoga";

export const schema = createSchema({
  typeDefs: /* GraphQL */ `
    type Price {
      value: Float!
      foorency: String!
    }

    type Sale {
      id: ID!
      price: Price!
    }

    type Query {
      sales: [Sale!]!
    }
  `,
  resolvers: {
    Query: {
      sales: () => [
        { id: "1", price: { value: 51.4, foorency: "PLN" } },
        { id: "2", price: { value: 33.23, foorency: "USD" } },
      ],
    },
  },
});

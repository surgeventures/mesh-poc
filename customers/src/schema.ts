import { createSchema } from "graphql-yoga";
import { faker } from "@faker-js/faker";

type Customer = {
  id: string;
  name: string;
  email: string;
};

const customers = faker.helpers.multiple<Customer>(
  (_, index) => ({
    id: `${index + 1}`,
    name: faker.person.fullName(),
    email: faker.internet.email(),
  }),
  { count: 1000 }
);

const customersMap: Map<string, Customer> = customers.reduce(
  (acc, customer) => {
    acc.set(customer.id, customer);
    return acc;
  },
  new Map<string, Customer>()
);

export const schema = createSchema({
  typeDefs: /* GraphQL */ `
    type Customer {
      id: ID!
      name: String!
      email: String!
    }

    type Query {
      customers(first: Int!): [Customer!]!
      customerById(id: ID!): Customer
    }
  `,
  resolvers: {
    Query: {
      customers: (_root, { first }) => customers.slice(0, first),
      customerById: (_root, { id }) => {
        return customersMap.get(id);
      },
    },
  },
});

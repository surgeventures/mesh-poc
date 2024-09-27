import { createSchema } from "graphql-yoga";

type Customer = {
  id: string;
  name: string;
  email: string;
};

const customers: Customer[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
  },
  {
    id: "2",
    name: "Jane Doe",
    email: "jane.doe@example.com",
  },
];

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
      customers: [Customer!]!
      customersByIds(ids: [ID!]!): [Customer]!
    }
  `,
  resolvers: {
    Query: {
      customers: () => customers,
      customersByIds: (_root, { ids }: { ids: string[] }) => {
        return ids.map((id) => customersMap.get(id));
      },
    },
  },
});

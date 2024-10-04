import { createSchema } from "graphql-yoga";
import { faker } from "@faker-js/faker";

type Appointment = {
  id: string;
  customerId: string;
  startsAt: string;
  endsAt: string;
};

const appointments = faker.helpers.multiple<Appointment>(
  (_, index) => ({
    id: `${index + 1}`,
    customerId: `${faker.helpers.rangeToNumber({ min: 1, max: 1000 })}`,
    startsAt: faker.date.recent().toISOString(),
    endsAt: faker.date.recent().toISOString(),
  }),
  { count: 1000 }
);

export const schema = createSchema({
  typeDefs: /* GraphQL */ `
    type Appointment {
      id: ID!
      customerId: ID!
      startsAt: String!
      endsAt: String!
    }

    type Query {
      appointments(first: Int!): [Appointment!]!
    }
  `,
  resolvers: {
    Query: {
      appointments: (_root, { first }) => appointments.slice(0, first),
    },
  },
});

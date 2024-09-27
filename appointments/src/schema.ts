import { createSchema } from "graphql-yoga";

const appointments = [
  {
    id: "1",
    customerId: "1",
    startsAt: "2021-01-01T10:00:00Z",
    endsAt: "2021-01-01T10:30:00Z",
  },
  {
    id: "2",
    customerId: "2",
    startsAt: "2021-01-01T11:00:00Z",
    endsAt: "2021-01-01T11:30:00Z",
  },
  {
    id: "3",
    customerId: "2",
    startsAt: "2021-01-01T12:00:00Z",
    endsAt: "2021-01-01T12:30:00Z",
  },
];

export const schema = createSchema({
  typeDefs: /* GraphQL */ `
    type Appointment {
      id: ID!
      customerId: ID!
      startsAt: String!
      endsAt: String!
    }

    type Query {
      appointments: [Appointment!]!
    }
  `,
  resolvers: {
    Query: {
      appointments: () => appointments,
    },
  },
});

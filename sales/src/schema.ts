import { createSchema } from "graphql-yoga";

const sales = [
  {
    id: "1",
    price: { value: 51.4, currency: "USD" },
    appointmentId: "1",
    customerId: "1",
  },
  {
    id: "2",
    price: { value: 33.23, currency: "USD" },
    appointmentId: "1",
    customerId: "1",
  },
];

export const schema = createSchema({
  typeDefs: /* GraphQL */ `
    type Price {
      value: Float!
      currency: String!
    }

    type Sale {
      id: ID!
      price: Price!
    }

    type Query {
      sales: [Sale!]!
      salesByAppointmentId(appointmentId: ID!): [Sale!]!
    }
  `,
  resolvers: {
    Query: {
      sales: () => sales,
      salesByAppointmentId: (_root, { appointmentId }) => {
        return sales.filter((sale) => sale.appointmentId === appointmentId);
      },
    },
  },
});

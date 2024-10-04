import { createSchema } from "graphql-yoga";
import { faker } from "@faker-js/faker";

type Sale = {
  id: string;
  price: { value: number; currency: string };
  appointmentId: string;
  customerId: string;
};

const sales = faker.helpers.multiple<Sale>(
  (_, index) => ({
    id: `${index + 1}`,
    price: {
      value: faker.number.float({ min: 0.01, max: 1000.0, fractionDigits: 2 }),
      currency: faker.finance.currencyCode(),
    },
    appointmentId: `${faker.helpers.rangeToNumber({ min: 1, max: 1000 })}`,
    customerId: `${faker.helpers.rangeToNumber({ min: 1, max: 1000 })}`,
  }),
  { count: 1000 }
);

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
      sales(first: Int!): [Sale!]!
      salesByAppointmentId(appointmentId: ID!): [Sale!]!
    }
  `,
  resolvers: {
    Query: {
      sales: (_root, { first }) => sales.slice(0, first),
      salesByAppointmentId: (_root, { appointmentId }) => {
        return sales.filter((sale) => sale.appointmentId === appointmentId);
      },
    },
  },
});

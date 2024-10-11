import { inspect } from "node:util";
import { createPubSub, createSchema, YogaInitialContext } from "graphql-yoga";
import { faker } from "@faker-js/faker";

type Appointment = {
  id: string;
  customerId: string;
  startsAt: string;
  endsAt: string;
};

const pubSub = createPubSub();

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

    input CreateAppointmentInput {
      customerId: ID!
      startsAt: String!
      endsAt: String!
    }

    type Query {
      appointments(first: Int!): [Appointment!]!
    }

    type Mutation {
      createAppointment(input: CreateAppointmentInput!): Appointment!
    }

    type Subscription {
      appointmentCreated: Appointment!
    }
  `,
  resolvers: {
    Query: {
      appointments: (_root, { first }) => appointments.slice(0, first),
    },
    Mutation: {
      createAppointment: (_root, { input }) => {
        const appointment = {
          id: `${appointments.length + 1}`,
          ...input,
        };
        appointments.push(appointment);
        pubSub.publish("appointments", appointment);
        return appointment;
      },
    },
    Subscription: {
      appointmentCreated: {
        subscribe: (_root, _args, context, _) => {
          console.debug("Subscribing to appointments");
          console.log({ context });
          return pubSub.subscribe("appointments");
        },
        resolve: (payload) => payload,
      },
    },
  },
});

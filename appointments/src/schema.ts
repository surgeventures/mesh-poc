import { inspect } from "node:util";
import { readFileSync } from "node:fs";
import { setTimeout as setTimeout$ } from "node:timers/promises";
import { createPubSub, createSchema } from "graphql-yoga";
import { faker } from "@faker-js/faker";
import jwksClient from "jwks-rsa";
import { verify, GetPublicKeyOrSecret } from "jsonwebtoken";
import { GraphQLError } from "graphql";

type Appointment = {
  id: string;
  customerId: string;
  startsAt: string;
  endsAt: string;
};

const client = jwksClient({
  jwksUri: "http://auth:3004/jwks",
});

const getKey: GetPublicKeyOrSecret = (header, callback) => {
  console.log({ kid: header.kid });
  client.getSigningKey(header.kid, function (err, key) {
    if (key) {
      callback(null, key.getPublicKey());
    } else {
      callback(new Error("Key not found"));
    }
  });
};

const sdl = readFileSync("./src/schema.graphql", { encoding: "utf-8" });

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
  typeDefs: sdl,
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
          console.debug({ context });
          return pubSub.subscribe("appointments");
        },
        resolve: async (payload, _args, context, _info) => {
          return new Promise((resolve, reject) => {
            console.debug("Resolving appointmentCreated");
            const token = context.params.extensions?.jwt?.token?.value;

            if (token) {
              verify(token, getKey, {}, function (err, _) {
                if (err) {
                  reject(
                    new GraphQLError("Unauthenticated", {
                      extensions: { code: "UNAUTHENTICATED" },
                    })
                  );
                } else {
                  resolve(payload);
                }
              });
            } else {
              console.debug(inspect(context, false, 2, true));
              resolve(payload);
            }
          });
        },
      },
      appointmentUpdated: {
        subscribe: async function* (_, { id }) {
          const appointment = appointments.find((a) => a.id === id);

          if (!appointment) throw new GraphQLError("Appointment not found");

          for (let i = 100; i >= 0; i--) {
            await setTimeout$(1000);
            appointment.startsAt = faker.date.recent().toISOString();
            appointment.endsAt = faker.date.recent().toISOString();
            yield { appointmentUpdated: appointment };
          }
        },
      },
    },
  },
});

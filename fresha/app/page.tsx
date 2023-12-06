import Image from "next/image";
import { cacheExchange, createClient, fetchExchange, gql } from "@urql/core";
import { registerUrql } from "@urql/next/rsc";
import { persistedExchange } from "@urql/exchange-persisted";
import { graphql } from "./gql";

const makeClient = () => {
  return createClient({
    url: "http://0.0.0.0:3000/graphql",
    exchanges: [
      cacheExchange,
      persistedExchange({
        preferGetForPersistedQueries: true,
      }),
      fetchExchange,
    ],
  });
};

const { getClient } = registerUrql(makeClient);

const appointmentsQuery = graphql(/* GraphQL */ `
  query appointments {
    AppController_getAppointments {
      data {
        customer {
          name
        }
        id
        price {
          currency
          value
        }
      }
    }
  }
`);

export default async function Home() {
  const result = await getClient().query(appointmentsQuery, {});

  if (result.error) return "Error";
  if (!result.data) return "Loading";

  const appointments = result.data?.AppController_getAppointments?.data || [];

  return (
    <main>
      {appointments.map((appointment) => {
        if (!appointment) return null;

        return (
          <div className="m-2 p-2 bg-violet-300" key={appointment.id}>
            {appointment.customer ? (
              <p>
                Appointment with <strong>{appointment.customer.name}</strong>
              </p>
            ) : null}
            <p>
              {appointment.price.value} {appointment.price.currency}
            </p>
          </div>
        );
      })}
    </main>
  );
}

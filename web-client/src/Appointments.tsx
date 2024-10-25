import { useEffect, useState } from "react";

type Appointment = {
  id: string;
  startsAt: string;
  endsAt: string;
};

enum ConnectionState {
  CONNECTED = "connected",
  DISCONNECTED = "disconnected",
  ERROR = "error",
}

function Appointments(props: { appointmentIds: string[] }) {
  const { appointmentIds } = props;
  const [appointments, setAppointments] = useState<Record<string, Appointment>>(
    {}
  );
  const [connectionStatuses, setConnectionStatus] = useState<
    Record<string, ConnectionState>
  >({});

  useEffect(() => {
    const eventSources: Record<string, EventSource> = {};

    appointmentIds.forEach((id) => {
      const url = new URL("http://localhost:4000/graphql");

      url.searchParams.append(
        "query",
        `subscription MySubscription { appointmentUpdated(id:"${id}"){ id startsAt endsAt } }`
      );

      url.searchParams.append("operationName", "MySubscription");
      url.searchParams.append("extensions", "{}");

      const eventSource = new EventSource(url);

      eventSource.onopen = () => {
        setConnectionStatus((prev) => ({
          ...prev,
          [id]: ConnectionState.CONNECTED,
        }));
      };

      eventSource.onerror = () => {
        setConnectionStatus((prev) => ({
          ...prev,
          [id]: ConnectionState.ERROR,
        }));
      };

      // Listen for appointment updates
      eventSource.addEventListener("next", (event) => {
        try {
          const {
            data: { appointmentUpdated },
          } = JSON.parse(event.data);

          setAppointments((prev) => ({
            ...prev,
            [id]: appointmentUpdated,
          }));
        } catch (error) {
          console.error(
            `Error parsing event data for appointment ${id}:`,
            error
          );
        }
      });

      eventSources[id] = eventSource;
    });

    return () => {
      Object.entries(eventSources).forEach(([id, es]) => {
        setConnectionStatus((prev) => ({
          ...prev,
          [id]: ConnectionState.DISCONNECTED,
        }));
        es.close();
      });
    };
  }, [appointmentIds]);

  return (
    <>
      <h1>Appointments</h1>

      {appointmentIds.map((id) => {
        const appointment = appointments[id];
        const connectionStatus = connectionStatuses[id];
        return (
          <ul key={id}>
            <li>
              <strong>ID:</strong> {id}
            </li>
            {appointment && connectionStatus && (
              <>
                <li>
                  <strong>Starts at:</strong> {appointment.startsAt}
                </li>
                <li>
                  <strong>Ends at:</strong> {appointment.endsAt}
                </li>
                <li>
                  <strong>Connection status:</strong> {connectionStatus}
                </li>
              </>
            )}
          </ul>
        );
      })}
    </>
  );
}

export default Appointments;

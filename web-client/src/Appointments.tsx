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

function boxColor(connectionStatus: ConnectionState | undefined | null) {
  if (!connectionStatus || connectionStatus === ConnectionState.DISCONNECTED) {
    return "#565656";
  }

  if (connectionStatus === ConnectionState.CONNECTED) {
    return "#2d8344";
  }

  if (connectionStatus === ConnectionState.ERROR) {
    return "#8f2424";
  }
}

type AppointmentsProps = {
  appointmentIds: string[];
  title: string;
  url: string;
};

function Appointments(props: AppointmentsProps) {
  const { appointmentIds, title, url } = props;
  const [appointments, setAppointments] = useState<Record<string, Appointment>>(
    {}
  );
  const [connectionStatuses, setConnectionStatus] = useState<
    Record<string, ConnectionState>
  >({});

  useEffect(() => {
    const eventSources: Record<string, EventSource> = {};

    appointmentIds.forEach((id) => {
      const urlObject = new URL(url);

      urlObject.searchParams.append(
        "query",
        `subscription MySubscription { appointmentUpdated(id:"${id}"){ id startsAt endsAt } }`
      );

      urlObject.searchParams.append("operationName", "MySubscription");
      urlObject.searchParams.append("extensions", "{}");

      const eventSource = new EventSource(urlObject);

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
  }, [appointmentIds, url]);

  return (
    <>
      <h1>{title}</h1>

      {appointmentIds.map((id) => {
        const appointment = appointments[id];
        const connectionStatus = connectionStatuses[id] || "disconnected";

        return (
          <ul key={id} style={{ backgroundColor: boxColor(connectionStatus) }}>
            <li>
              <strong>ID:</strong> {id}
            </li>
            <li>
              <strong>Connection status:</strong> {connectionStatus}
            </li>
            <li>
              <strong>Starts at:</strong> {appointment?.startsAt || "-"}
            </li>
            <li>
              <strong>Ends at:</strong> {appointment?.endsAt || "-"}
            </li>
          </ul>
        );
      })}
    </>
  );
}

export default Appointments;

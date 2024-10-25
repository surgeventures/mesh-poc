import "./App.css";
import Appointments from "./Appointments";

const appointmentIds = Array(100)
  .fill(null)
  .map((_, i) => (i + 1).toString());

function App() {
  return (
    <div className="grid-container">
      <div>
        <Appointments
          title="HTTP 1.1"
          url="http://localhost:4001/graphql"
          appointmentIds={appointmentIds}
        />
      </div>
      <div>
        <Appointments
          title="HTTP/2"
          url="https://localhost:4002/graphql"
          appointmentIds={appointmentIds}
        />
      </div>
    </div>
  );
}

export default App;

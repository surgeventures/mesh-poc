import "./App.css";
import Appointments from "./Appointments";

const appointmentIds = Array(100)
  .fill(null)
  .map((_, i) => (i + 1).toString());

function App() {
  return (
    <>
      <Appointments appointmentIds={appointmentIds} />
    </>
  );
}

export default App;

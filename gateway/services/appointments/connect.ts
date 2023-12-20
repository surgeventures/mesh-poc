import { customersBatched } from "../customers/share";
import { connect } from "../../enmesh";

export const connections = [
  connect("Appointments_Appointment", "customer", customersBatched),
];

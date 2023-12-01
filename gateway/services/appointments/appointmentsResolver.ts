import { Resolvers } from "../../.mesh";

const appointmentsResolver: Resolvers = {
  Appointments_Appointment: {
    customer: {
      selectionSet: `{ idz }`, // this doesn't seem to do anything
      resolve: async (root, args, context, info) =>
        context.Customers.Query.customers_CustomersService_FindOneByAppointmentId(
          {
            root,
            context,
            info,
            args: {
              input: {
                appointmentId: root.id,
              },
            },
          },
        ),
    },
  },
};

export default appointmentsResolver;

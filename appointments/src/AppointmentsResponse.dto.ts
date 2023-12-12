class Price {
  value: number;
  currency: string;
}

class Appointment {
  id: number;
  price: Price;
  customerId: number
}
export class AppointmentsResponseDto {
  data: Appointment[];
}

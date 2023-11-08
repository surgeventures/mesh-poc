class Price {
  value: number;
  currency: string;
}

class Appointment {
  id: number;
  price: Price;
}
export class AppointmentsResponseDto {
  data: Appointment[];
}

import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getAppointments() {
    return [
      { id: 1, price: { value: 15.5, currency: 'PLN' } },
      { id: 2, price: { value: 25.6, currency: 'USD' } },
    ];
  }
}

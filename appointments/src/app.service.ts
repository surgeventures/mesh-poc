import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getAppointments() {
    return [
      { id: 1, price: { value: 15.5, currency: 'PLN' }, customerId: 1 },
      { id: 2, price: { value: 25.6, currency: 'USD' }, customerId: 1 },
      { id: 3, price: { value: 35.6, currency: 'EUR' }, customerId: 2 },
      { id: 4, price: { value: 45.6, currency: 'GPL' }, customerId: 2 },
    ];
  }
}

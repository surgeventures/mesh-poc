import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { GrpcMethod } from '@nestjs/microservices';

interface CustomerById {
  id: number;
}

interface CustomerByAppointmentId {
  appointmentId: number;
}

interface Customer {
  id: number;
  name: string;
}

const customersDB = [
  { id: 1, name: 'John', appointments: [1, 2] },
  { id: 2, name: 'Doe', appointments: [3, 4] },
];

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @GrpcMethod('CustomersService', 'FindOne')
  findOne(
    data: CustomerById,
    // metadata: Metadata,
    // call: ServerUnaryCall<any, any>,
  ): Customer {
    return customersDB.find(({ id }) => id === data.id);
  }

  @GrpcMethod('CustomersService', 'FindOneByAppointmentId')
  findOneByAppointmentId(
    data: CustomerByAppointmentId,
    // metadata: Metadata,
    // call: ServerUnaryCall<any, any>,
  ): Customer {
    return customersDB.find(({ appointments }) =>
      appointments.includes(data.appointmentId),
    );
  }
}

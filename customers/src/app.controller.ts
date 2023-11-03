import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { GrpcMethod } from '@nestjs/microservices';

interface CustomerById {
  id: number;
}

interface Customer {
  id: number;
  name: string;
}

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
    const customers = [
      { id: 1, name: 'John' },
      { id: 2, name: 'Doe' },
    ];
    return customers.find(({ id }) => id === data.id);
  }
}

import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOkResponse, ApiProperty } from '@nestjs/swagger';

class Hello {
  @ApiProperty()
  message: string;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello')
  @ApiOkResponse({
    status: 200,
    description: 'Greets people',
    type: Hello,
  })
  getHello() {
    return this.appService.getHello();
  }
}

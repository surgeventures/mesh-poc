import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOkResponse } from '@nestjs/swagger';
import { AppointmentsResponseDto } from './AppointmentsResponse.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('appointments')
  @ApiOkResponse({
    status: 200,
    description: 'Returns appointments',
    type: AppointmentsResponseDto,
  })
  getAppointments(): AppointmentsResponseDto {
    return {
      data: this.appService.getAppointments(),
    };
  }
}

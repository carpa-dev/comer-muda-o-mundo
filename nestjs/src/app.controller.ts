import { Controller, Get, All } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  //  @All()
  //  huh(): string {
  //    return 'hello cutie pi';
  //  }
}

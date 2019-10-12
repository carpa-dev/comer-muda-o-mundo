import { Controller, Get, All } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @All() // Matches "*" on all methods GET, POST...
  genericFunction() {
    return '404 page';
  }
}

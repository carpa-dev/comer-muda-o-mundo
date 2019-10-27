import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from './user.entity';
import { ActivateDto } from './activate.dto';
import { AuthService } from './auth.service';

@Controller('activation')
export class ActivationController {
  constructor(public authService: AuthService) {}

  @UseGuards(AuthGuard())
  @Post()
  create(@Body() activateDto: ActivateDto, @Req() req: any): any {
    return this.authService.activate(req.user.id, activateDto.password);
  }
}

import { Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { User } from './users/entities/user.entity';
import { CurrentUser } from '@app/common/decorators/current-user.decorator';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @CurrentUser() user: User,
    @Res({ passthrough: true }) response: Response,
  ) {
    const authToken = await this.authService.login(user, response);
    response.send({ ...user, authToken });
  }

  @Get()
  findAll() {
    return this.authService.findAll();
  }
}

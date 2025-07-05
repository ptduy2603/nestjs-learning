import { UserRegisterDto } from './dto/register.dto';
import { Body, Controller, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import { UserLoginDto } from './dto/login.dto';

@Controller({ path: '/auth', version: '1' })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  async register(@Body() body: UserRegisterDto) {
    return this.authService.createUser(body);
  }

  @Post('/login')
  async login(@Body() body: UserLoginDto) {
    return this.authService.login(body);
  }
}

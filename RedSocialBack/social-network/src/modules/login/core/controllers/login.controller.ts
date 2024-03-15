import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { LoginService } from '../../adapters/services/login.service';
import { LoginInterface } from '../../adapters/interfaces/login.interface';

@Controller('auth')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() credentials: LoginInterface): Promise<{ token: string }> {
    const tokenvalue = this.loginService.login(credentials);
    return tokenvalue;
  }
}

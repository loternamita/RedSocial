import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginInterface } from '../interfaces/login.interface';
import { UserService } from '../../../user/adapters/services/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class LoginService {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  async login(user: LoginInterface): Promise<{ token: string }> {
    const userFind = await this.userService.findByEmail(user.email);
    if (!userFind) {
      throw new UnauthorizedException('Credenciales inválidas');
    }
    const passwordsMatch = await bcrypt.compare(
      user.password,
      userFind.password,
    );

    if (!passwordsMatch) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const token = await this.authService.generateToken(user.email);

    const tokenObject = {
      token,
    };

    return tokenObject;
  }
}

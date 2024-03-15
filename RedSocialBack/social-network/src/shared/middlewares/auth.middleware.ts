import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';
import { RequestWithUser } from '../../modules/login/adapters/interfaces/req.interface';
import { UserService } from '../../modules/user/adapters/services/user.service';
import { UserInterface } from '../../modules/user/adapters/interfaces/user.interface';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async use(req: RequestWithUser, res: Response, next: NextFunction) {
    const token = req.headers['authorization']?.split(' ')[0];

    if (!token) {
      return res
        .status(401)
        .json({ message: 'Token de autenticación no proporcionado' });
    }

    try {
      const decodedToken = this.jwtService.verify(token);
      const userEmail = decodedToken.email;
      const emailParam = req.params.email;

      if (userEmail !== emailParam)
        throw new UnauthorizedException('Invalid session');

      const user: UserInterface = await this.userService.findByEmail(userEmail);

      if (user.email !== userEmail)
        throw new UnauthorizedException('Usuario no encontrado');

      req.user = user;

      next();
    } catch (error) {
      return res
        .status(401)
        .json({ message: 'Por favor registrarse o iniciar sesion' });
    }
  }
}

import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  BadRequestException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// Esta clase la convertimos inyectable para su uso
@Injectable()
export class ValidationInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { age, fullname } = request.body;

    // Validar la edad
    if (isNaN(age)) {
      throw new BadRequestException('La edad debe ser un número.');
    }

    // Validar que el campo fullname solo sea una cade de texto
    if (!/^[A-Za-z\s]+$/.test(fullname)) {
      throw new BadRequestException(
        'El nombre completo debe ser una cadena de texto.',
      );
    }

    return next.handle().pipe(
      map((data) => {
        return data;
      }),
    );
  }
}

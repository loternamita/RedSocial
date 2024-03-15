import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

// Middleware para validar peticiones HTTP, Headers, Params.
@Injectable()
export class LoggerMiddleWare implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);

    if (!req.headers['custom-header']) {
      return res.status(400).json({ message: 'Custom header no se encuentra' });
    }

    next();
  }
}

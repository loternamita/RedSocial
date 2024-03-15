import { UserInterface } from '../../../user/adapters/interfaces/user.interface';
import { Request } from 'express';

export interface RequestWithUser extends Request {
  user?: UserInterface;
}

import { UserInterface } from '../../../user/adapters/interfaces/user.interface';

export interface PostInterface {
  id: number;
  title: string;
  content: string;
  likes: number;
  user: UserInterface;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

import { UserInterface } from '../../user/interface/user.interface';

export interface PostInterface {
  id?: number;
  title: string;
  content: string;
  likes?: number;
  user: UserInterface;
  createdAt?: Date | null;
  updatedAt?: Date | null;
  deletedAt?: Date | null;
}

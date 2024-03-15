import { PostInterface } from '../../../post/adapters/interfaces/posts.interface';

export interface UserInterface {
  id: number;
  fullname: string;
  age: number;
  email: string;
  password: string;
  posts: PostInterface[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

import { type PostInterface } from 'src/app/core/modules/post/interfaces/post.interface';

export interface UserInterface {
  id?: number;
  fullname: string;
  age: number;
  email: string;
  password: string;
  posts?: PostInterface[];
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

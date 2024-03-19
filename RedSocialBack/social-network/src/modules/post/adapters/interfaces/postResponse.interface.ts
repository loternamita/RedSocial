import { UserInterface } from '../../../user/adapters/interfaces/user.interface';

export interface PostsResponse {
  posts: UserInterface[];
  total: number;
}

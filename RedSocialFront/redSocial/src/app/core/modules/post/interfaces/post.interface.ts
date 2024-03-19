import { UserInterface } from "../../user/interface/user.interface";

export interface PostInterface {
  id?: number;
  title: string;
  content: string;
  likes?: number;
  users?: UserInterface;
  createdAt: Date;
  updatedAt?: Date | null;
  deletedAt?: Date | null;
}

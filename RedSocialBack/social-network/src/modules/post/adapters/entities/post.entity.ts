import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { UserEntity } from '../../../user/adapters/entities/user.entity';

@Entity()
export class PostEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column({ default: 0 })
  likes: number;

  @Column({ default: () => 'CURRENT_TIMESTAMP', nullable: true })
  createdAt: Date;

  @Column({ default: () => 'CURRENT_TIMESTAMP', nullable: true })
  updatedAt: Date;

  @Column({ default: () => 'CURRENT_TIMESTAMP', nullable: true })
  deletedAt: Date;

  @ManyToOne(() => UserEntity, (user) => user.posts)
  user: UserEntity;
}

import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PostEntity } from '../../../post/adapters/entities/post.entity';

// Clase entidad que invoca los tipos de datos y obligatoriedad en la BD
@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'user_id',
  })
  id: number;

  @Column({
    default: '',
    type: 'varchar',
    nullable: false,
  })
  fullname: string;

  @Column({
    type: 'bigint',
    nullable: false,
  })
  age: number;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  email: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  password: string;

  @OneToMany(() => PostEntity, (post) => post.user, { eager: true })
  posts: PostEntity[];

  @Column({
    default: () => 'CURRENT_TIMESTAMP',
    type: 'timestamp',
    nullable: true,
  })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    nullable: true,
  })
  updatedAt: Date;

  @Column({
    type: 'timestamp',
    nullable: true,
  })
  deletedAt: Date;
}

import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UserEntity } from '../../modules/user/adapters/entities/user.entity';
import * as dotenv from 'dotenv';
import { PostEntity } from '../../modules/post/adapters/entities/post.entity';

// Realiza la configuracion del archivo .env para tener credenciales mas seguras
dotenv.config();

// Configuracion de la BD de postgres y credenciales
const dbConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT, 10) || 5000,
  username: process.env.DB_USERNAME || 'default',
  password: process.env.DB_PASSWORD || 'default',
  database: process.env.DB_DATABASE || 'default',
  synchronize: process.env.NODE_ENV !== 'default',
  entities: [UserEntity, PostEntity],
};

export default dbConfig;

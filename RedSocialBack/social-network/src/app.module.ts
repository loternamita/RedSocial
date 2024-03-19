import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UserRepository } from './modules/user/adapters/repositories/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import dbConfig from './shared/utils/db.config';
import { UserController } from './modules/user/core/controllers/user.controller';
import { UserService } from './modules/user/adapters/services/user.service';
import { UserEntity } from './modules/user/adapters/entities/user.entity';
import { PostEntity } from './modules/post/adapters/entities/post.entity';
import { PostController } from './modules/post/core/controllers/post.controller';
import { PostService } from './modules/post/adapters/services/post.service';
import { LoginController } from './modules/login/core/controllers/login.controller';
import { AuthService } from './modules/login/adapters/services/auth.service';
import { LoginService } from './modules/login/adapters/services/login.service';
import { JwtModule } from '@nestjs/jwt';
import { PostRepository } from './modules/post/adapters/repositories/post.repository';
import { AuthMiddleware } from './shared/middlewares/auth.middleware';

@Module({
  imports: [
    TypeOrmModule.forRoot(dbConfig),
    TypeOrmModule.forFeature([UserRepository]),
    TypeOrmModule.forFeature([PostRepository]),
    TypeOrmModule.forFeature([UserEntity]),
    TypeOrmModule.forFeature([PostEntity]),
    JwtModule.register({
      secret: 'VcGdA+c167wAZj/pqWl47il6qzpJvkM7atSrHEQarAM=', // Clave secreta generada con openssl de UNIX
      //signOptions: { expiresIn: '8h' },  Tiempo de expiración del token
    }),
  ],
  controllers: [UserController, PostController, LoginController],
  providers: [UserService, PostService, AuthService, LoginService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(
      { path: '/posts/updatePost/:email/:titulo', method: RequestMethod.PUT },
      { path: '/users/updateUser/:email', method: RequestMethod.PUT },
      { path: '/users/deleteuser/:email', method: RequestMethod.DELETE },
      { path: '/users/getByEmail/:email', method: RequestMethod.GET },
      {
        path: '/posts/deletePost/:email/:titulo',
        method: RequestMethod.DELETE,
      },
      { path: '/posts/savePost/:email', method: RequestMethod.POST },
      { path: '/posts/likePost/:email/:titulo', method: RequestMethod.PUT },
      { path: '/posts/disLikePost/:email/:titulo', method: RequestMethod.PUT },
      { path: '/posts/searchPosts/:email', method: RequestMethod.GET },
    );
  }
}

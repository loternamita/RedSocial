import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostEntity } from '../entities/post.entity';
import { PostInterface } from '../interfaces/posts.interface';
import { UserEntity } from '../../../user/adapters/entities/user.entity';

// Clase servicio que realiza procesos y envia peticiones hacia la BD
@Injectable()
export class PostService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
  ) {}

  // Method: Guarda todas las publicaciones de acuerdo a un usuario en la Base de datos
  async savePost(email: string, post: PostInterface): Promise<PostInterface> {
    try {
      const user = await this.userRepository.findOne({ where: { email } });

      if (!user) throw new Error('El usuario no existe');

      post.user = user;
      post.createdAt = new Date();
      post.updatedAt = null;
      post.deletedAt = null;
      const userSaved = await this.postRepository.save(post);

      return userSaved;
    } catch (error) {
      throw new HttpException(
        'Error al procesar la solicitud: ' + error,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updatePost(
    email: string,
    titulo: string,
    postUpdate: Partial<PostInterface>,
  ): Promise<PostInterface> {
    try {
      const user = await this.userRepository.findOne({ where: { email } });

      if (!user) throw new Error('El usuario no existe');

      // Buscar el post por su título y verificar si pertenece al usuario
      const postFind = await this.postRepository.findOne({
        where: { title: titulo, user: { id: user.id } },
      });

      if (!postFind)
        throw new Error('La publicacion no existe o no pertenece al usuario');

      Object.assign(postFind, postUpdate);
      postFind.updatedAt = new Date();
      postFind.deletedAt = null;

      await this.postRepository.save(postFind);
      return postFind;
    } catch (error) {
      throw new HttpException(
        'Error al procesar la solicitud: ' + error,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deletePost(email: string, titulo: string): Promise<PostInterface> {
    try {
      const user = await this.userRepository.findOne({ where: { email } });

      if (!user) throw new Error('El usuario no existe');

      const postFind = await this.postRepository.findOne({
        where: { title: titulo, user: { id: user.id } },
      });

      if (!postFind)
        throw new Error('La publicacion no existe o no pertene al usuario');

      postFind.deletedAt = new Date();
      await this.postRepository.save(postFind);
      return postFind;
    } catch (error) {
      throw new HttpException(
        'Error al procesar la solicitud: ' + error,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async likePost(email: string, titulo: string): Promise<PostInterface> {
    try {
      const user = await this.userRepository.findOne({ where: { email } });

      if (!user) throw new Error('El usuario no existe');

      const post = await this.postRepository.findOne({
        where: { title: titulo, user },
      });

      if (!post) throw new Error('La publicacion no existe');

      post.likes += 1;
      post.updatedAt = new Date();

      const updatedPost = await this.postRepository.save(post);
      return updatedPost;
    } catch (error) {
      throw new HttpException(
        'Error al procesar la solicitud: ' + error,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async disLikePost(email: string, titulo: string): Promise<PostInterface> {
    try {
      const user = await this.userRepository.findOne({ where: { email } });

      if (!user) throw new Error('El usuario no existe');

      const post = await this.postRepository.findOne({
        where: { title: titulo, user },
      });

      if (!post) throw new Error('La publicacion no existe');

      if (post.likes > 0) {
        post.likes -= 1;
      }
      post.updatedAt = new Date();

      const updatedPost = await this.postRepository.save(post);
      return updatedPost;
    } catch (error) {
      throw new HttpException(
        'Error al procesar la solicitud: ' + error,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getPosts(
    page: number,
    pageSize: number,
    email: string,
  ): Promise<PostInterface[]> {
    try {
      const startIndex = (page - 1) * pageSize;
      const posts = await this.postRepository.find({
        where: { user: { email } },
        take: pageSize,
        skip: startIndex,
        order: { createdAt: 'DESC' },
      });

      return posts;
    } catch (error) {
      throw new HttpException(
        'Error al procesar la solicitud: ' + error,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async searchPosts(query: string, email: string): Promise<PostInterface[]> {
    try {
      const posts = await this.postRepository
        .createQueryBuilder('post')
        .innerJoinAndSelect('post.user', 'user')
        .where(
          '(post.title LIKE :query OR post.content LIKE :query) AND user.email = :email',
          { query: `%${query}%`, email },
        )
        .getMany();
      return posts;
    } catch (error) {
      throw new HttpException(
        'Error al procesar la solicitud: ' + error,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

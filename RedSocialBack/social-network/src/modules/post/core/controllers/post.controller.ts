import {
  Body,
  Controller,
  Param,
  Post,
  Put,
  Delete,
  Get,
  Query,
} from '@nestjs/common';
import { PostInterface } from '../../../post/adapters/interfaces/posts.interface';
import { PostService } from '../../../post/adapters/services/post.service';
import { PostsResponse } from '../../adapters/interfaces/postResponse.interface';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post('savePost/:email')
  savePost(
    @Param('email') email: string,
    @Body() post: PostInterface,
  ): Promise<PostInterface> {
    const dto = this.postService.savePost(email, post);
    return dto;
  }

  @Put('updatePost/:email/:titulo')
  updatePost(
    @Param() params: { email: string; titulo: string },
    @Body() post: PostInterface,
  ): Promise<PostInterface> {
    const { email, titulo } = params;
    const dto = this.postService.updatePost(email, titulo, post);
    return dto;
  }

  @Delete('deletePost/:email/:titulo')
  deletePost(
    @Param() params: { email: string; titulo: string },
  ): Promise<PostInterface> {
    const { email, titulo } = params;
    const dto = this.postService.deletePost(email, titulo);
    return dto;
  }

  @Put('likePost/:email/:titulo')
  likePosts(@Param() params: { email: string; titulo: string }) {
    const { email, titulo } = params;
    const dto = this.postService.likePost(email, titulo);
    return dto;
  }

  @Put('disLikePost/:email/:titulo')
  disLikePost(@Param() params: { email: string; titulo: string }) {
    const { email, titulo } = params;
    const dto = this.postService.disLikePost(email, titulo);
    return dto;
  }

  @Get('getPosts')
  getPosts(
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 10,
  ): Promise<PostsResponse> {
    const posts = this.postService.getPosts(page, pageSize);
    return posts;
  }

  @Get('getPaginatePosts')
  getPostsByUser(
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
  ): Promise<{ posts: PostInterface[]; total: number }> {
    const posts = this.postService.getPaginatedPosts(page, pageSize);
    return posts;
  }

  @Get('searchPosts/:email')
  searchPosts(
    @Query('query') query: string,
    @Param('email') email: string,
  ): Promise<PostInterface[]> {
    return this.postService.searchPosts(query, email);
  }

  @Get('getPostById/:id')
  getPostById(@Param('id') id: number): Promise<PostInterface> {
    return this.postService.getPostById(id);
  }
}

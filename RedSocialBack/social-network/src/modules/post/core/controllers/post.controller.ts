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

  @Get('getPosts/:email')
  getPosts(
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 10,
    @Param('email') email: string,
  ): Promise<PostInterface[]> {
    const posts = this.postService.getPosts(page, pageSize, email);
    return posts;
  }

  @Get('searchPosts/:email')
  searchPosts(
    @Query('query') query: string,
    @Param('email') email: string,
  ): Promise<PostInterface[]> {
    return this.postService.searchPosts(query, email);
  }
}

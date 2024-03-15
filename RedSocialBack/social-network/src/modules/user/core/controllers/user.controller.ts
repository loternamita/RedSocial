import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from '../../adapters/services/user.service';
import { UserInterface } from '../../adapters/interfaces/user.interface';
import { ValidationInterceptor } from '../../../../shared/interceptors/validation.interceptor';
import { AuthMiddleware } from '../../../../shared/middlewares/auth.middleware';

// Controller que registra los usuarios
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Method: Recoge el body(user) para ser procesado
  @Post('saveuser')
  @UseInterceptors(ValidationInterceptor)
  postSaveUser(@Body() user: UserInterface): Promise<UserInterface> {
    const dto = this.userService.createUser(user);
    return dto;
  }

  // Method: Eliminar un usuario cambiando su estado
  @Delete('deleteuser/:email')
  @UseGuards(AuthMiddleware)
  deleteUser(@Param('email') email: string): Promise<UserInterface> {
    const dto = this.userService.softDeleteUser(email);
    return dto;
  }

  @Put('updateUser/:email')
  @UseGuards(AuthMiddleware)
  updateUser(
    @Param('email') email: string,
    @Body() user: UserInterface,
  ): Promise<UserInterface> {
    const dto = this.userService.updateUser(email, user);
    return dto;
  }
}

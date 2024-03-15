import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { UserInterface } from '../interfaces/user.interface';
import * as bcrypt from 'bcrypt';

// Clase servicio que realiza procesos y envia peticiones hacia la BD
@Injectable()
export class UserService {
  private readonly saltRound: number = 10;

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  // Method: Guarda el usuario en la Base de datos
  async createUser(user: UserInterface): Promise<UserInterface> {
    try {
      const email = user.email;
      const findUser = await this.userRepository.findOne({ where: { email } });

      if (findUser != null)
        throw new Error('El usuario ya existe: ' + findUser.email);

      const passEncrypt = await bcrypt.hash(user.password, this.saltRound);
      user.createdAt = new Date();
      user.updatedAt = null;
      user.deletedAt = null;
      user.password = passEncrypt;
      const userSaved = await this.userRepository.save(user);

      return userSaved;
    } catch (error) {
      throw new HttpException(
        'Error al procesar la solicitud: ' + error,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Method: Elimina el usuario pero solo cambia su estado mas no lo elimina de la base de datos
  async softDeleteUser(email: string): Promise<UserInterface> {
    try {
      const deletedAt = new Date();
      const result = await this.userRepository.update({ email }, { deletedAt });

      if (result.affected === 0) throw new Error('Usuario no encontrado');

      const userFind = await this.userRepository.findOneBy({ email });
      return userFind;
    } catch (error) {
      throw new HttpException(
        'Error al procesar la solicitud: ' + error,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateUser(email: string, user: UserInterface): Promise<UserInterface> {
    try {
      const passEncrypt = await bcrypt.hash(user.password, this.saltRound);
      user.password = passEncrypt;
      user.updatedAt = new Date();
      user.deletedAt = null;
      const result = await this.userRepository.update({ email }, user);

      if (result.affected === 0) throw new Error('El usuario no existe: ');

      const userFind = await this.userRepository.findOneBy({ email });
      return userFind;
    } catch (error) {
      throw new HttpException(
        'Error al procesar la solicitud: ' + error,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findByEmail(email: string): Promise<UserInterface> {
    try {
      const userFind = await this.userRepository.findOne({ where: { email } });
      if (userFind == null) throw new Error('El usuario no existe: ');
      return userFind;
    } catch (error) {
      throw new HttpException(
        'Error al procesar la solicitud: ' + error,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

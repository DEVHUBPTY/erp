import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountStatus } from './entity/account.entity';
import { Role } from './entity/role.entity';
import { User } from './entity/user.enity';

import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from './user.dto';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    @InjectRepository(AccountStatus)
    private accountStatusRepository: Repository<AccountStatus>,
  ) { }



  async createUser(createUserDto: CreateUserDto): Promise<User> {
    try {
      // Verificar si el rol existe
      const role = await this.roleRepository.findOne({
        where: { id: createUserDto.roleId },
      });

      if (!role) {
        throw new NotFoundException(
          `Role with ID ${createUserDto.roleId} not found`,
        );
      }

      // Hashear la contraseña
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

      // Crear el usuario
      const user = this.userRepository.create({
        ...createUserDto,
        password: hashedPassword,
        role: role,
        accountStatus: this.accountStatusRepository.create({
          balance: 0,
          isDelinquent: false,
        }),
      });

      return this.userRepository.save(user);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async deleteUser(id: number): Promise<void> {
    try {
      const user = await this.findUserById(id);
      await this.userRepository.delete(user);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAllUsers(): Promise<User[]> {
    try {
      return this.userRepository.find();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findUserById(id: number): Promise<User> {
    try {
      const user = await this.userRepository.findOne({ where: { id } });
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return user;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      const user = await this.findUserById(id);

      // Si se proporciona una nueva contraseña, hashearla
      if (updateUserDto.password) {
        updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
      }

      // Si se cambia el rol, verificar que exista y actualizar la relación
      if (updateUserDto.roleId && updateUserDto.roleId !== user.roleId) {
        const role = await this.roleRepository.findOne({
          where: { id: updateUserDto.roleId },
        });

        if (!role) {
          throw new NotFoundException(
            `Role with ID ${updateUserDto.roleId} not found`,
          );
        }

        // Actualizar la relación con el rol
        user.role = role;
      }

      // Actualizar los campos del usuario
      Object.assign(user, updateUserDto);

      return this.userRepository.save(user);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

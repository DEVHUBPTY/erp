import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.enity';
import { Role } from './entity/role.entity';
import { AccountStatus } from './entity/account.entity';
@Module({
  imports: [TypeOrmModule.forFeature([User, Role, AccountStatus])],
  providers: [UserService],
  controllers: [UserController]
})
export class UserModule { }

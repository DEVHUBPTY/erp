import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { User } from 'src/user/user.entity';
import { Role } from 'src/user/role.entity';
import { AccountStatus } from 'src/user/user.entity';
import { Cart } from 'src/cart/cart.entity';
// Importa otras entidades aquí

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1009',
      database: 'inventory',
      entities: [User, Role, AccountStatus, Cart],
      synchronize: false, // ⚠️ Solo para desarrollo
    }),
  ],
})
export class DatabaseModule {}

import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { User } from 'src/user/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1009',
      database: 'inventory',
      entities: [User],
      synchronize: false, // ⚠️ Solo para desarrollo
    }),
  ],
})
export class DatabaseModule { }
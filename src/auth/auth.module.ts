import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config'; // 👈 Agrega esto

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';

import { AuthToken } from './entity/auth.entity';
import { RefreshToken } from './entity/refresh.entity';
import { User } from '@/user/entity/user.enity';

@Module({
  imports: [
    ConfigModule, // 👈 Asegúrate de importar ConfigModule
    PassportModule,
    TypeOrmModule.forFeature([User, AuthToken, RefreshToken]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET'), // ✅ Usa ConfigService
        signOptions: { expiresIn: '15m' }, // o '1d' si prefieres
      }),
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule { }
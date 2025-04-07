import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { AccountStatus } from './entity/account.entity';

/**
 * DTO para la autenticación de usuarios
 */
export class LoginDto {
  @ApiProperty({
    example: 'usuario@ejemplo.com',
    description: 'Correo electrónico del usuario',
    required: true
  })
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({
    example: 'contraseña123',
    description: 'Contraseña del usuario (mínimo 8 caracteres)',
    required: true,
    minLength: 8
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  readonly password: string;
}

export class LoginResponseDto {
  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    description: 'Token de acceso JWT'
  })
  access_token: string;

  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    description: 'Token de refresco JWT'
  })
  refresh_token: string;
}

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  roleId: number;

  @IsString()
  @IsNotEmpty()
  role: string;

  @ApiProperty()
  @IsEnum(AccountStatus)
  @IsNotEmpty()
  accountStatus: AccountStatus;

  @ApiProperty()
  @IsDate()
  @IsNotEmpty()
  createdAt: Date;

  @ApiProperty()
  @IsDate()
  @IsNotEmpty()
  updatedAt: Date;
}

export class CreateAccountStatusDto {
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  balance?: number = 0;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  isDelinquent?: boolean = false;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional()
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  @MinLength(8)
  password?: string;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  roleId?: number;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  role?: string;
}

export class UpdateAccountStatusDto {
  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  balance?: number;

  @ApiPropertyOptional()
  @IsOptional()
  isDelinquent?: boolean;
}

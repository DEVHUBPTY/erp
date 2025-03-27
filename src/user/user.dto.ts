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

import { AccountStatus } from './user.entity';

/**
 * DTO para la autenticación de usuarios
 */
export class LoginDto {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  readonly password: string;
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

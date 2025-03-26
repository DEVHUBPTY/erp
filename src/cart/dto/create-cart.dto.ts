import {
  IsInt,
  IsOptional,
  IsString,
  ValidateNested,
  IsArray,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCartProductDto {
  @IsInt()
  productVariantId: number;

  @IsInt()
  @Min(1)
  quantity: number;

  @IsOptional()
  unitPrice?: number;

  @IsOptional()
  unitNegotiablePrice?: number;

  @IsOptional()
  totalPrice?: number;

  @IsOptional()
  @IsString()
  status?: string;
}

export class CreateCartDto {
  @IsInt()
  sellerId: number;

  @IsInt()
  customerId: number;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateCartProductDto)
  productList: CreateCartProductDto[];
}

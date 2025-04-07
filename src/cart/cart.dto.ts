import {
  IsInt,
  IsOptional,
  IsString,
  ValidateNested,
  IsArray,
  Min,
  IsNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CartResponseDto {
  id: number;
  sellerId: number;
  customerId: number;
  sellerNotes?: string;
  productList: CartProductResponseDto[];
  createdAt: Date;
  updatedAt: Date;
}

export class CartProductResponseDto {
  id: number;
  productId: string;
  quantity: number;
  unitPrice: number;
  unitNegotiablePrice?: number;
  totalPrice: number;
  status?: string;
}

export class CreateCartProductDto {
  @IsString()
  @IsNotEmpty()
  productId: string;

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
  sellerNotes?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateCartProductDto)
  productList: CreateCartProductDto[];
}


export class UpdateCartDto {
  @IsOptional()
  @IsString()
  sellerNotes?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateCartProductDto)
  productList?: CreateCartProductDto[];
}

export class DeleteCartResponseDto {
  message: string;
}

import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { OrderStatus, PaymentMethod } from './order.entity';

// DTO for order items within an order
class OrderDetailDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  productId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  productName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  productImage: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  unitlPrice: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  negotiablePrice: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  totalPrice: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  totalNegotiablePrice: number;
}

// DTO for creating orders
export class CreateOrderDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  customerId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  sellerId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  orderNumber: string;

  @ApiProperty()
  orderDate: Date;

  @ApiProperty()
  status: OrderStatus;

  @ApiProperty()
  totalAmount: number;

  @ApiProperty()
  totalAmountPaid: number;

  @ApiProperty()
  totalAmountPending: number;

  @ApiProperty()
  totalNegotiable: number;

  @ApiProperty()
  deliveryDate: Date;

  @ApiProperty()
  paymentMethod: PaymentMethod;

  @ApiProperty()
  proofOfPayment: string;

  @ApiProperty({ type: [OrderDetailDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderDetailDto)
  details: OrderDetailDto[];
}

// DTO for order responses
export class OrderResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  customerName: string;

  @ApiProperty()
  customerPhone: string;

  @ApiProperty()
  customerEmail: string;

  @ApiProperty()
  customerAddress: string;

  @ApiProperty()
  sellerName: string;

  @ApiProperty()
  sellerPhone: string;

  @ApiProperty()
  orderNumber: string;

  @ApiProperty()
  status: OrderStatus;

  @ApiProperty()
  totalAmount: number;

  @ApiProperty()
  totalAmountPaid: number;

  @ApiProperty()
  totalAmountPending: number;

  @ApiProperty()
  totalNegotiable: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  deliveryDate: Date;

  @ApiProperty()
  paymentMethod: PaymentMethod;

  @ApiProperty()
  proofOfPayment: string;

  @ApiProperty()
  sellerNotes: string;

  @ApiProperty()
  adminNotes: string;

  @ApiProperty({ type: [OrderDetailDto] })
  details: OrderDetailDto[];
}

// DTO for updating orders
export class UpdateOrderDto extends OrderResponseDto {}

// DTO for deleting orders
export class DeleteOrderDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
}

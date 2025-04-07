import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { OrderStatus, PaymentMethod } from './entity/order.types';



// DTO for order items within an order
class OrderDetailDto {
  @ApiProperty({
    example: '1',
    description: 'ID del producto',
    required: true
  })
  @IsString()
  @IsNotEmpty()
  productId: string;

  @ApiProperty({
    example: 'Laptop HP 15.6"',
    description: 'Nombre del producto',
    required: true
  })
  @IsString()
  @IsNotEmpty()
  productName: string;

  @ApiProperty({
    example: 'https://ejemplo.com/imagen.jpg',
    description: 'URL de la imagen del producto',
    required: true
  })
  @IsString()
  @IsNotEmpty()
  productImage: string;

  @ApiProperty({
    example: 2,
    description: 'Cantidad del producto',
    required: true
  })
  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @ApiProperty({
    example: 999.99,
    description: 'Precio unitario del producto',
    required: true
  })
  @IsNumber()
  @IsNotEmpty()
  unitlPrice: number;

  @ApiProperty({
    example: 899.99,
    description: 'Precio negociado del producto',
    required: true
  })
  @IsNumber()
  @IsNotEmpty()
  negotiablePrice: number;

  @ApiProperty({
    example: 1999.98,
    description: 'Precio total del producto (cantidad * precio unitario)',
    required: true
  })
  @IsNumber()
  @IsNotEmpty()
  totalPrice: number;

  @ApiProperty({
    example: 1799.98,
    description: 'Precio total negociado del producto (cantidad * precio negociado)',
    required: true
  })
  @IsNumber()
  @IsNotEmpty()
  totalNegotiablePrice: number;
}

// DTO for creating orders
export class CreateOrderDto {
  @ApiProperty({
    example: '1',
    description: 'ID del cliente',
    required: true
  })
  @IsString()
  @IsNotEmpty()
  customerId: string;

  @ApiProperty({
    example: '2',
    description: 'ID del vendedor',
    required: true
  })
  @IsString()
  @IsNotEmpty()
  sellerId: string;

  @ApiProperty({
    example: 'ORD-2024-001',
    description: 'Número de orden',
    required: true
  })
  @IsString()
  @IsNotEmpty()
  orderNumber: string;

  @ApiProperty({
    example: '2024-04-06T00:00:00.000Z',
    description: 'Fecha de la orden',
    required: true
  })
  orderDate: Date;

  @ApiProperty({
    example: 'PENDING',
    description: 'Estado de la orden',
    required: true,
    enum: OrderStatus
  })
  status: OrderStatus;

  @ApiProperty({
    example: 1999.98,
    description: 'Monto total de la orden',
    required: true
  })
  totalAmount: number;

  @ApiProperty({
    example: 0.00,
    description: 'Monto total pagado',
    required: true
  })
  totalAmountPaid: number;

  @ApiProperty({
    example: 1999.98,
    description: 'Monto total pendiente',
    required: true
  })
  totalAmountPending: number;

  @ApiProperty({
    example: 200.00,
    description: 'Monto total negociable',
    required: true
  })
  totalNegotiable: number;

  @ApiProperty({
    example: '2024-04-10T00:00:00.000Z',
    description: 'Fecha de entrega',
    required: true
  })
  deliveryDate: Date;

  @ApiProperty({
    example: 'CASH',
    description: 'Método de pago',
    required: true,
    enum: PaymentMethod
  })
  paymentMethod: PaymentMethod;

  @ApiProperty({
    example: 'https://ejemplo.com/comprobante.jpg',
    description: 'URL del comprobante de pago',
    required: true
  })
  proofOfPayment: string;

  @ApiProperty({
    type: [OrderDetailDto],
    description: 'Detalles de los productos en la orden',
    required: true,
    example: [{
      productId: '1',
      productName: 'Laptop HP 15.6"',
      productImage: 'https://ejemplo.com/imagen.jpg',
      quantity: 2,
      unitlPrice: 999.99,
      negotiablePrice: 899.99,
      totalPrice: 1999.98,
      totalNegotiablePrice: 1799.98
    }]
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderDetailDto)
  details: OrderDetailDto[];
}

// DTO for order responses
export class OrderResponseDto {
  @ApiProperty({
    example: 1,
    description: 'ID de la orden'
  })
  id: number;

  @ApiProperty({
    example: 'Juan Pérez',
    description: 'Nombre del cliente'
  })
  customerName: string;

  @ApiProperty({
    example: '+1234567890',
    description: 'Teléfono del cliente'
  })
  customerPhone: string;

  @ApiProperty({
    example: 'cliente@ejemplo.com',
    description: 'Email del cliente'
  })
  customerEmail: string;

  @ApiProperty({
    example: 'Calle Principal 123',
    description: 'Dirección del cliente'
  })
  customerAddress: string;

  @ApiProperty({
    example: 'María García',
    description: 'Nombre del vendedor'
  })
  sellerName: string;

  @ApiProperty({
    example: '+0987654321',
    description: 'Teléfono del vendedor'
  })
  sellerPhone: string;

  @ApiProperty({
    example: 'ORD-2024-001',
    description: 'Número de orden'
  })
  orderNumber: string;

  @ApiProperty({
    example: 'PENDING',
    description: 'Estado de la orden',
    enum: OrderStatus
  })
  status: OrderStatus;

  @ApiProperty({
    example: 1999.98,
    description: 'Monto total de la orden'
  })
  totalAmount: number;

  @ApiProperty({
    example: 0.00,
    description: 'Monto total pagado'
  })
  totalAmountPaid: number;

  @ApiProperty({
    example: 1999.98,
    description: 'Monto total pendiente'
  })
  totalAmountPending: number;

  @ApiProperty({
    example: 200.00,
    description: 'Monto total negociable'
  })
  totalNegotiable: number;

  @ApiProperty({
    example: '2024-04-06T00:00:00.000Z',
    description: 'Fecha de creación'
  })
  createdAt: Date;

  @ApiProperty({
    example: '2024-04-10T00:00:00.000Z',
    description: 'Fecha de entrega'
  })
  deliveryDate: Date;

  @ApiProperty({
    example: 'CASH',
    description: 'Método de pago',
    enum: PaymentMethod
  })
  paymentMethod: PaymentMethod;

  @ApiProperty({
    example: 'https://ejemplo.com/comprobante.jpg',
    description: 'URL del comprobante de pago'
  })
  proofOfPayment: string;

  @ApiProperty({
    example: 'Cliente solicita entrega antes de las 5pm',
    description: 'Notas del vendedor'
  })
  sellerNotes: string;

  @ApiProperty({
    example: 'Orden prioritaria',
    description: 'Notas del administrador'
  })
  adminNotes: string;

  @ApiProperty({
    type: [OrderDetailDto],
    description: 'Detalles de los productos en la orden'
  })
  details: OrderDetailDto[];
}

// DTO for updating orders
export class UpdateOrderDto extends OrderResponseDto { }

// DTO for deleting orders
export class DeleteOrderDto {
  @ApiProperty({
    example: '1',
    description: 'ID de la orden a eliminar',
    required: true
  })
  @IsString()
  @IsNotEmpty()
  id: string;
}

// DTOs for Product Module
import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsOptional,
  IsNotEmpty,
  IsDate,
} from 'class-validator';

// Response DTO for getting products
export class GetProductResponseDto {
  @ApiProperty({
    example: '1',
    description: 'ID único del producto'
  })
  id: string;

  @ApiProperty({
    example: 'Laptop HP 15.6"',
    description: 'Nombre del producto'
  })
  name: string;

  @ApiProperty({
    example: 'Laptop HP con procesador Intel Core i5',
    description: 'Descripción detallada del producto',
    required: false
  })
  description?: string;

  @ApiProperty({
    example: 'HP123456789',
    description: 'Código de barras del producto'
  })
  barcode: string;

  @ApiProperty({
    example: 'https://ejemplo.com/imagen.jpg',
    description: 'URL de la imagen del producto'
  })
  image: string;

  @ApiProperty({
    example: {
      id: 1,
      name: 'Electrónicos'
    },
    description: 'Categoría del producto'
  })
  category: {
    id: number;
    name: string;
  };

  @ApiProperty({
    example: {
      id: 1,
      name: 'HP'
    },
    description: 'Marca del producto'
  })
  brand: {
    id: number;
    name: string;
  };

  @ApiProperty({
    example: 999.99,
    description: 'Precio del producto'
  })
  price: number;

  @ApiProperty({
    example: 50,
    description: 'Cantidad disponible en stock'
  })
  stock: number;

  @ApiProperty({
    example: '2024-12-31',
    description: 'Fecha de expiración del producto',
    required: false
  })
  expiration?: Date;
}

// DTO for creating products
export class CreateProductDto {
  @ApiProperty({
    example: 'Laptop HP 15.6"',
    description: 'Nombre del producto',
    required: true
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'Laptop HP con procesador Intel Core i5',
    description: 'Descripción detallada del producto',
    required: false
  })
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty({
    example: 'HP123456789',
    description: 'Código de barras del producto',
    required: true
  })
  @IsString()
  @IsNotEmpty()
  barcode: string;

  @ApiProperty({
    example: 'https://ejemplo.com/imagen.jpg',
    description: 'URL de la imagen del producto',
    required: true
  })
  @IsString()
  @IsNotEmpty()
  image: string;

  @ApiProperty({
    example: 1,
    description: 'ID del proveedor',
    required: true
  })
  @IsNumber()
  @IsNotEmpty()
  supplierId: number;

  @ApiProperty({
    example: 1,
    description: 'ID de la categoría',
    required: true
  })
  @IsNumber()
  @IsNotEmpty()
  categoryId: number;

  @ApiProperty({
    example: 999.99,
    description: 'Precio del producto',
    required: true
  })
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty({
    example: 50,
    description: 'Cantidad disponible en stock',
    required: true
  })
  @IsNumber()
  @IsNotEmpty()
  stock: number;

  @ApiProperty({
    example: '2024-12-31',
    description: 'Fecha de expiración del producto',
    required: true
  })
  @IsDate()
  @IsNotEmpty()
  expiration: Date;
}

// DTO for updating products
export class UpdateProductDto {
  @ApiProperty({
    example: '1',
    description: 'ID del producto a actualizar',
    required: true
  })
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty({
    example: 'Laptop HP 15.6" Actualizada',
    description: 'Nuevo nombre del producto',
    required: true
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'Laptop HP con procesador Intel Core i5 - Modelo 2024',
    description: 'Nueva descripción del producto',
    required: false
  })
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty({
    example: 'HP123456789',
    description: 'Nuevo código de barras del producto',
    required: true
  })
  @IsString()
  @IsNotEmpty()
  barcode: string;

  @ApiProperty({
    example: 'https://ejemplo.com/nueva-imagen.jpg',
    description: 'Nueva URL de la imagen del producto',
    required: true
  })
  @IsString()
  @IsNotEmpty()
  image: string;

  @ApiProperty({
    example: 1,
    description: 'Nuevo ID del proveedor',
    required: true
  })
  @IsNumber()
  @IsNotEmpty()
  supplierId: number;

  @ApiProperty({
    example: 1,
    description: 'Nuevo ID de la categoría',
    required: true
  })
  @IsNumber()
  @IsNotEmpty()
  categoryId: number;

  @ApiProperty({
    example: 1099.99,
    description: 'Nuevo precio del producto',
    required: true
  })
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty({
    example: 75,
    description: 'Nueva cantidad disponible en stock',
    required: true
  })
  @IsNumber()
  @IsNotEmpty()
  stock: number;

  @ApiProperty({
    example: '2024-12-31',
    description: 'Nueva fecha de expiración del producto',
    required: true
  })
  @IsDate()
  @IsNotEmpty()
  expiration?: Date;
}

// DTO for deleting products
export class DeleteProductDto {
  @ApiProperty({
    example: '1',
    description: 'ID del producto a eliminar',
    required: true
  })
  @IsString()
  @IsNotEmpty()
  id: string;
}

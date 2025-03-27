// DTOs for Product Module
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, IsNotEmpty, IsBoolean, IsDate, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

// Base attribute DTO used in other DTOs
class AttributeDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;

    @ApiProperty()
    value: string;
}

// Base variant DTO used in other DTOs
class VariantDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    price: number;

    @ApiProperty()
    stock: number;

    @ApiProperty()
    isDefault: boolean;

    @ApiProperty()
    expiration: Date;

    @ApiProperty({ type: [AttributeDto] })
    attributes: AttributeDto[];
}

// Response DTO for getting products
export class GetProductResponseDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    name: string;

    @ApiProperty({ required: false })
    description?: string;

    @ApiProperty()
    barcode: string;

    @ApiProperty()
    image: string;

    @ApiProperty()
    category: {
        id: number;
        name: string;
    };

    @ApiProperty()
    brand: {
        id: number;
        name: string;
    };

    @ApiProperty({ type: [VariantDto] })
    variants: VariantDto[];
}

// DTO for creating variants
class CreateVariantDto {
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    price: number;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    stock: number;

    @ApiProperty()
    @IsBoolean()
    @IsNotEmpty()
    isDefault: boolean;

    @ApiProperty()
    @IsDate()
    @IsNotEmpty()
    expiration: Date;

    @ApiProperty({ type: [AttributeDto] })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => AttributeDto)
    attributes: AttributeDto[];
}

// DTO for updating variants
class UpdateVariantDto extends CreateVariantDto {
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    id: number;
}

// DTO for creating products
export class CreateProductDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    description: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    barcode: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    image: string;

    @ApiProperty({
        description: 'Select a supplier to get its ID'
    })
    @IsNumber()
    @IsNotEmpty()
    supplierId: number;

    @ApiProperty({
        description: 'Select a category to get its ID'
    })
    @IsNumber()
    @IsNotEmpty()
    categoryId: number;

    @ApiProperty({ type: [CreateVariantDto] })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateVariantDto)
    variants: CreateVariantDto[];
}

// DTO for updating products
export class UpdateProductDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    id: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    description: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    barcode: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    image: string;

    @ApiProperty({
        description: 'Select a supplier to get its ID'
    })
    @IsNumber()
    @IsNotEmpty()
    supplierId: number;

    @ApiProperty({
        description: 'Select a category to get its ID'
    })
    @IsNumber()
    @IsNotEmpty()
    categoryId: number;

    @ApiProperty({ type: [UpdateVariantDto] })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => UpdateVariantDto)
    variants: UpdateVariantDto[];
}

// DTO for deleting products
export class DeleteProductDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    id: string;
}

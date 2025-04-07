import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
} from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { CreateProductDto, GetProductResponseDto, UpdateProductDto } from './product.dto';
import { ProductService } from './product.service';
@ApiTags('Productos')
@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) { }

    @Get()
    @ApiOperation({
        summary: 'Obtener todos los productos',
        description: 'Retorna una lista de todos los productos disponibles en el sistema'
    })
    @ApiOkResponse({
        type: GetProductResponseDto,
        isArray: true,
        description: 'Lista de productos obtenida exitosamente'
    })
    async getAllProducts(): Promise<GetProductResponseDto[]> {
        return this.productService.getAllProducts();
    }

    @Get(':id')
    @ApiOperation({
        summary: 'Obtener un producto por ID',
        description: 'Retorna los detalles de un producto específico basado en su ID'
    })
    @ApiParam({
        name: 'id',
        type: String,
        description: 'ID del producto a obtener',
        example: '1'
    })
    @ApiOkResponse({
        type: GetProductResponseDto,
        description: 'Producto encontrado exitosamente'
    })
    async findOne(@Param('id') id: string): Promise<GetProductResponseDto> {
        return this.productService.getProductById(id);
    }

    @Post()
    @ApiOperation({
        summary: 'Crear un nuevo producto',
        description: 'Crea un nuevo producto en el sistema con los datos proporcionados'
    })
    @ApiCreatedResponse({
        description: 'Producto creado exitosamente',
        type: GetProductResponseDto
    })
    @ApiBody({
        type: CreateProductDto,
        description: 'Datos del producto a crear',
        examples: {
            example1: {
                value: {
                    name: 'Laptop HP 15.6"',
                    description: 'Laptop HP con procesador Intel Core i5',
                    barcode: 'HP123456789',
                    image: 'https://ejemplo.com/imagen.jpg',
                    supplierId: 1,
                    categoryId: 1,
                    price: 999.99,
                    stock: 50,
                    expiration: '2024-12-31'
                }
            }
        }
    })
    async create(@Body() body: CreateProductDto) {
        return this.productService.create(body);
    }

    @Put(':id')
    @ApiOperation({
        summary: 'Actualizar un producto existente',
        description: 'Actualiza los datos de un producto existente basado en su ID'
    })
    @ApiParam({
        name: 'id',
        type: String,
        description: 'ID del producto a actualizar',
        example: '1'
    })
    @ApiBody({
        type: UpdateProductDto,
        description: 'Datos del producto a actualizar',
        examples: {
            example1: {
                value: {
                    name: 'Laptop HP 15.6" Actualizada',
                    description: 'Laptop HP con procesador Intel Core i5 - Modelo 2024',
                    barcode: 'HP123456789',
                    image: 'https://ejemplo.com/nueva-imagen.jpg',
                    supplierId: 1,
                    categoryId: 1,
                    price: 1099.99,
                    stock: 75,
                    expiration: '2024-12-31'
                }
            }
        }
    })
    @ApiOkResponse({
        description: 'Producto actualizado exitosamente',
        type: GetProductResponseDto
    })
    async update(
        @Param('id') id: string,
        @Body() body: UpdateProductDto,
    ) {
        return this.productService.update(id, body);
    }

    @Delete(':id')
    @ApiOperation({
        summary: 'Eliminar un producto existente',
        description: 'Elimina un producto del sistema basado en su ID'
    })
    @ApiParam({
        name: 'id',
        type: String,
        description: 'ID del producto a eliminar',
        example: '1'
    })
    @ApiOkResponse({
        description: 'Producto eliminado exitosamente'
    })
    async delete(@Param('id') id: string) {
        return this.productService.delete(id);
    }
}
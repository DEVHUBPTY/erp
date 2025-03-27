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

@ApiTags('Product')
@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) { }

    @Get()
    @ApiOperation({ summary: 'Obtener todos los productos' })
    @ApiOkResponse({ type: GetProductResponseDto, isArray: true })
    async getAllProducts(): Promise<GetProductResponseDto[]> {
        return this.productService.getAllProducts();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Obtener un producto por ID' })
    @ApiParam({ name: 'id', type: String, description: 'ID del producto a obtener' })
    @ApiOkResponse({ type: GetProductResponseDto, description: 'Producto encontrado exitosamente' })
    async findOne(@Param('id') id: string): Promise<GetProductResponseDto> {
        return this.productService.getProductById(id);
    }

    @Post()
    @ApiOperation({ summary: 'Crear un nuevo producto' })
    @ApiCreatedResponse({ description: 'Producto creado exitosamente' })
    @ApiBody({ type: CreateProductDto, description: 'Datos del producto a crear' })
    async create(@Body() body: CreateProductDto) {
        return this.productService.create(body);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Actualizar un producto existente' })
    @ApiParam({ name: 'id', type: String, description: 'ID del producto a actualizar' })
    @ApiBody({ type: UpdateProductDto, description: 'Datos del producto a actualizar' })
    @ApiOkResponse({ description: 'Producto actualizado exitosamente' })
    async update(
        @Param('id') id: string,
        @Body() body: UpdateProductDto,
    ) {
        return this.productService.update(id, body);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Eliminar un producto existente' })
    @ApiParam({ name: 'id', type: String, description: 'ID del producto a eliminar' })
    @ApiOkResponse({ description: 'Producto eliminado exitosamente' })
    async delete(@Param('id') id: string) {
        return this.productService.delete(id);
    }
}
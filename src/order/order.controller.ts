import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { OrdersService } from './order.service';
import { CreateOrderDto, OrderResponseDto, UpdateOrderDto } from './order.dto';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Orders')
@Controller('orders')
export class OrderController {
    constructor(private readonly orderService: OrdersService) { }

    @Get()
    @ApiOperation({ summary: 'Obtener todas las ordenes' })
    @ApiOkResponse({ type: OrderResponseDto, isArray: true })
    async getAllOrders(): Promise<OrderResponseDto[]> {
        return this.orderService.getAllOrders();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Obtener una orden por ID' })
    @ApiOkResponse({ type: OrderResponseDto })
    async getOrderById(@Param('id') id: string): Promise<OrderResponseDto> {
        return this.orderService.getOrderById(id);
    }

    @Post()
    @ApiOperation({ summary: 'Crear una nueva orden' })
    @ApiBody({ type: CreateOrderDto })
    @ApiOkResponse({ type: OrderResponseDto })
    async createOrder(@Body() createOrderDto: CreateOrderDto): Promise<OrderResponseDto> {
        return this.orderService.create(createOrderDto);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Actualizar una orden por ID' })
    @ApiBody({ type: UpdateOrderDto })
    @ApiOkResponse({ type: OrderResponseDto })
    async updateOrder(
        @Param('id') id: string,
        @Body() updateOrderDto: UpdateOrderDto
    ): Promise<OrderResponseDto> {
        return this.orderService.update(id, updateOrderDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Eliminar una orden por ID' })
    async deleteOrder(@Param('id') id: string): Promise<{ message: string }> {
        return this.orderService.delete(id);
    }
}

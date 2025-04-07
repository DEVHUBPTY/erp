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
import { CreateOrderDto, OrderResponseDto, UpdateOrderDto } from './order.dto';
import { OrdersService } from './order.service';

@ApiTags('Órdenes')
@Controller('order')
export class OrderController {
    constructor(private readonly orderService: OrdersService) { }

    @Get()
    @ApiOperation({
        summary: 'Obtener todas las órdenes',
        description: 'Retorna una lista de todas las órdenes en el sistema'
    })
    @ApiOkResponse({
        type: OrderResponseDto,
        isArray: true,
        description: 'Lista de órdenes obtenida exitosamente'
    })
    async getAllOrders(): Promise<OrderResponseDto[]> {
        return this.orderService.getAllOrders();
    }

    @Get(':id')
    @ApiOperation({
        summary: 'Obtener una orden por ID',
        description: 'Retorna los detalles de una orden específica basada en su ID'
    })
    @ApiParam({
        name: 'id',
        type: String,
        description: 'ID de la orden a obtener',
        example: '1'
    })
    @ApiOkResponse({
        type: OrderResponseDto,
        description: 'Orden encontrada exitosamente'
    })
    async findOne(@Param('id') id: string): Promise<OrderResponseDto> {
        return this.orderService.getOrderById(id);
    }

    @Post()
    @ApiOperation({
        summary: 'Crear una nueva orden',
        description: 'Crea una nueva orden en el sistema con los datos proporcionados'
    })
    @ApiCreatedResponse({
        description: 'Orden creada exitosamente',
        type: OrderResponseDto
    })
    @ApiBody({
        type: CreateOrderDto,
        description: 'Datos de la orden a crear',
        examples: {
            example1: {
                value: {
                    customerId: '1',
                    sellerId: '2',
                    orderNumber: 'ORD-2024-001',
                    orderDate: '2024-04-06T00:00:00.000Z',
                    status: 'PENDING',
                    totalAmount: 1999.98,
                    totalAmountPaid: 0.00,
                    totalAmountPending: 1999.98,
                    totalNegotiable: 200.00,
                    deliveryDate: '2024-04-10T00:00:00.000Z',
                    paymentMethod: 'CASH',
                    proofOfPayment: 'https://ejemplo.com/comprobante.jpg',
                    details: [{
                        productId: '1',
                        productName: 'Laptop HP 15.6"',
                        productImage: 'https://ejemplo.com/imagen.jpg',
                        quantity: 2,
                        unitlPrice: 999.99,
                        negotiablePrice: 899.99,
                        totalPrice: 1999.98,
                        totalNegotiablePrice: 1799.98
                    }]
                }
            }
        }
    })
    async create(@Body() body: CreateOrderDto) {
        return this.orderService.create(body);
    }

    @Put(':id')
    @ApiOperation({
        summary: 'Actualizar una orden existente',
        description: 'Actualiza los datos de una orden existente basada en su ID'
    })
    @ApiParam({
        name: 'id',
        type: String,
        description: 'ID de la orden a actualizar',
        example: '1'
    })
    @ApiBody({
        type: UpdateOrderDto,
        description: 'Datos de la orden a actualizar',
        examples: {
            example1: {
                value: {
                    status: 'COMPLETED',
                    totalAmountPaid: 1999.98,
                    totalAmountPending: 0.00,
                    sellerNotes: 'Orden completada exitosamente'
                }
            }
        }
    })
    @ApiOkResponse({
        description: 'Orden actualizada exitosamente',
        type: OrderResponseDto
    })
    async update(
        @Param('id') id: string,
        @Body() body: UpdateOrderDto,
    ) {
        return this.orderService.update(id, body);
    }

    @Delete(':id')
    @ApiOperation({
        summary: 'Eliminar una orden existente',
        description: 'Elimina una orden del sistema basada en su ID'
    })
    @ApiParam({
        name: 'id',
        type: String,
        description: 'ID de la orden a eliminar',
        example: '1'
    })
    @ApiOkResponse({
        description: 'Orden eliminada exitosamente'
    })
    async delete(@Param('id') id: string) {
        return this.orderService.delete(id);
    }
}

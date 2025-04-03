import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderDto, UpdateOrderDto, OrderResponseDto } from './order.dto';
import { Order, OrderDetail } from './order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async getAllOrders(): Promise<OrderResponseDto[]> {
    const orders = await this.orderRepository.find({
      relations: ['details', 'customer', 'seller', 'details.product'],
      order: {
        createdAt: 'DESC',
      },
    });

    return orders.map((order) => ({
      id: order.id,
      customerName: order.customer.name,
      customerPhone: order.customer.phone,
      customerEmail: order.customer.email,
      details: order.details.map((item) => ({
        productId: item.productId,
        productName: item.product.name,
        productImage: item.product.image,
        quantity: item.quantity,
        unitlPrice: item.unitPrice,
        negotiablePrice: item.unitNegotiablePrice,
        totalPrice: item.totalPrice,
        totalNegotiablePrice: item.totalNegotiablePrice,
      })),
      customerAddress: order.customer.address,
      sellerName: order.seller.name,
      sellerPhone: order.seller.phone,
      orderNumber: order.orderNumber,
      status: order.status,
      totalAmount: order.totalAmount,
      totalAmountPaid: order.totalAmountPaid,
      totalAmountPending: order.totalAmountPending,
      totalNegotiable: order.totalNegotiable,
      createdAt: order.createdAt,
      deliveryDate: order.deliveryDate,
      paymentMethod: order.paymentMethod,
      proofOfPayment: order.proofOfPayment,
      sellerNotes: order.sellerNotes,
      adminNotes: order.adminNotes,
    }));
  }

  async getOrderById(id: string): Promise<OrderResponseDto> {
    const order = await this.orderRepository.findOne({
      where: { id: this.validateId(id) },
      relations: ['details', 'customer', 'seller', 'details.product'],
    });

    if (!order) {
      throw new NotFoundException(`Orden con ID ${id} no encontrada`);
    }

    return {
      id: order.id,
      customerName: order.customer.name,
      customerEmail: order.customer.email,
      customerAddress: order.customer.address,
      customerPhone: order.customer.phone,
      sellerName: order.seller.name,
      sellerPhone: order.seller.phone,
      orderNumber: order.orderNumber,
      createdAt: order.createdAt,
      status: order.status,
      totalAmount: order.totalAmount,
      totalAmountPaid: order.totalAmountPaid,
      totalAmountPending: order.totalAmountPending,
      totalNegotiable: order.totalNegotiable,
      deliveryDate: order.deliveryDate,
      paymentMethod: order.paymentMethod,
      proofOfPayment: order.proofOfPayment,
      details: order.details.map((item) => ({
        productId: item.productId,
        productName: item.product.name,
        productImage: item.product.image,
        quantity: item.quantity,
        unitlPrice: item.unitPrice,
        negotiablePrice: item.unitNegotiablePrice,
        totalPrice: item.totalPrice,
        totalNegotiablePrice: item.totalNegotiablePrice,
      })),
      sellerNotes: order.sellerNotes,
      adminNotes: order.adminNotes,
    };
  }

  async create(createOrderDto: CreateOrderDto): Promise<OrderResponseDto> {
    const order = new Order();

    // Validar montos
    if (createOrderDto.totalAmount < 0) {
      throw new BadRequestException('El monto total no puede ser negativo');
    }

    const totalAmountPending =
      createOrderDto.totalAmount - (createOrderDto.totalAmountPaid || 0);
    if (totalAmountPending < 0) {
      throw new BadRequestException(
        'El monto pagado no puede ser mayor al monto total',
      );
    }

    // Asignar propiedades básicas
    order.customerId = this.validateId(createOrderDto.customerId);
    order.sellerId = this.validateId(createOrderDto.sellerId);
    order.orderNumber = createOrderDto.orderNumber;
    order.createdAt = createOrderDto.orderDate || new Date();
    order.status = createOrderDto.status;
    order.totalAmount = createOrderDto.totalAmount;
    order.totalAmountPaid = createOrderDto.totalAmountPaid;
    order.totalAmountPending = totalAmountPending;
    order.totalNegotiable = createOrderDto.totalNegotiable;
    order.deliveryDate = createOrderDto.deliveryDate;
    order.paymentMethod = createOrderDto.paymentMethod;
    order.proofOfPayment = createOrderDto.proofOfPayment;

    // Crear detalles de la orden
    if (createOrderDto.details?.length > 0) {
      order.details = createOrderDto.details.map((detail) => {
        const orderDetail = new OrderDetail();
        orderDetail.productId = detail.productId;
        orderDetail.quantity = detail.quantity;
        orderDetail.unitPrice = detail.unitlPrice;
        orderDetail.unitNegotiablePrice = detail.negotiablePrice;
        orderDetail.totalPrice = detail.totalPrice;
        orderDetail.totalNegotiablePrice = detail.totalNegotiablePrice;
        orderDetail.order = order;
        return orderDetail;
      });
    }

    const savedOrder = await this.orderRepository.save(order);
    return this.getOrderById(savedOrder.id.toString());
  }

  async update(
    id: string,
    updateOrderDto: UpdateOrderDto,
  ): Promise<OrderResponseDto> {
    const order = await this.orderRepository.findOne({
      where: { id: this.validateId(id) },
      relations: ['details'],
    });

    if (!order) {
      throw new NotFoundException(`Orden con ID ${id} no encontrada`);
    }

    // Validar montos
    if (updateOrderDto.totalAmount < 0) {
      throw new BadRequestException('El monto total no puede ser negativo');
    }

    const totalAmountPending =
      updateOrderDto.totalAmount - updateOrderDto.totalAmountPaid;
    if (totalAmountPending < 0) {
      throw new BadRequestException(
        'El monto pagado no puede ser mayor al monto total',
      );
    }

    // Actualizar propiedades básicas
    Object.assign(order, {
      ...updateOrderDto,
      totalAmountPending,
    });

    // Actualizar detalles
    if (updateOrderDto.details?.length > 0) {
      order.details = updateOrderDto.details.map((detail) => {
        const existingDetail = order.details.find(
          (d) => d.productId === detail.productId,
        );
        if (existingDetail) {
          return Object.assign(existingDetail, {
            quantity: detail.quantity,
            unitPrice: detail.unitlPrice,
            unitNegotiablePrice: detail.negotiablePrice,
            totalPrice: detail.totalPrice,
            totalNegotiablePrice: detail.totalNegotiablePrice,
          });
        }

        const newDetail = new OrderDetail();
        Object.assign(newDetail, {
          productId: detail.productId,
          quantity: detail.quantity,
          unitPrice: detail.unitlPrice,
          unitNegotiablePrice: detail.negotiablePrice,
          totalPrice: detail.totalPrice,
          totalNegotiablePrice: detail.totalNegotiablePrice,
          order,
        });
        return newDetail;
      });
    }

    await this.orderRepository.save(order);
    return this.getOrderById(id);
  }

  async delete(id: string): Promise<{ message: string }> {
    const order = await this.orderRepository.findOne({
      where: { id: this.validateId(id) },
    });

    if (!order) {
      throw new NotFoundException(`Orden con ID ${id} no encontrada`);
    }

    await this.orderRepository.remove(order);
    return { message: `Orden con ID ${id} ha sido eliminada` };
  }

  private validateId(id: string): number {
    const numericId = parseInt(id);
    if (isNaN(numericId)) {
      throw new BadRequestException('ID inválido');
    }
    return numericId;
  }
}

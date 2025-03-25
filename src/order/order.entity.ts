import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { ProductVariant } from '@product/product.entity';
import { User } from '@/user/user.entity';

export enum OrderStatus {
    PENDING = 'PENDIENTE',
    CONFIRMED = 'CONFIRMADO',
    PREPARING = 'PREPARANDO',
    COMPLETED = 'COMPLETADA',
    CANCELLED = 'CANCELADA'
}

export enum PriceStatus {
    CURRENT = 'ACTUAL', // Cuando el precio es el actual
    PROMOTION = 'PROMOCION', // Cuando el precio es una promoción
    NEGOTIABLE = 'NEGOCIABLE' // Cuando el cliente negocia el precio
}

export enum PaymentMethod {
    CASH = 'Efectivo',
    // CARD = 'Tarjeta de crédito',
    TRANSFER = 'Transferencia'
}

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    orderNumber: string;

    @Column({ type: 'timestamp', nullable: false })
    orderDate: Date;

    @Column({
        type: 'enum',
        enum: OrderStatus,
        default: OrderStatus.PENDING
    })
    status: OrderStatus;

    @Column('float')
    totalAmount: number;

    @Column('float')
    totalAmountPaid: number;

    @Column('float')
    totalAmountPending: number;

    @Column('float')
    totalNegotiable: number;

    @OneToMany(() => OrderDetail, detail => detail.order)
    details: OrderDetail[];

    @Column({ type: "timestamp", nullable: false })
    deliveryDate: Date;

    @Column({
        type: 'enum',
        enum: PaymentMethod,
        nullable: true
    })
    paymentMethod: PaymentMethod;

    @Column({ nullable: true })
    proofOfPayment: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'clientId' })
    client: User;

    @Column()
    clientId: number;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'sellerId' })
    seller: User;

    @Column()
    sellerId: number;
}

@Entity()
export class OrderDetail {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    orderId: number;

    @ManyToOne(() => Order, order => order.details)
    @JoinColumn({ name: 'orderId' })
    order: Order;

    @Column()
    productVariantId: number;

    @ManyToOne(() => ProductVariant)
    @JoinColumn({ name: 'productVariantId' })
    productVariant: ProductVariant;

    @Column()
    quantity: number;

    @Column('float')
    unitPrice: number;

    @Column('float')
    originalTotalPrice: number;

    @Column('float')
    unitNegotiablePrice: number;

    @Column('float')
    totalPrice: number; // Si precio negociable, se calcula el total con el precio negociable, si no, se calcula con el precio actual

    @Column({
        type: 'enum',
        enum: PriceStatus,
        default: PriceStatus.CURRENT
    })
    status: PriceStatus;
}

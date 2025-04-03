import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Product } from '@product/product.entity';
import { User } from '@/user/user.entity';

export enum OrderStatus {
  PENDING = 'PENDIENTE',
  CONFIRMED = 'CONFIRMADO',
  PREPARING = 'PREPARANDO',
  COMPLETED = 'COMPLETADA',
  CANCELLED = 'CANCELADA',
}

export enum PriceStatus {
  CURRENT = 'ACTUAL',
  PROMOTION = 'PROMOCION',
  NEGOTIABLE = 'NEGOCIABLE',
}

export enum PaymentMethod {
  CASH = 'Efectivo',
  TRANSFER = 'Transferencia',
}

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  orderNumber: string;

  @Column({ type: 'timestamp', nullable: false })
  createdAt: Date;

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.PENDING,
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

  @OneToMany(() => OrderDetail, (detail) => detail.order)
  details: OrderDetail[];

  @Column({ type: 'timestamp', nullable: false })
  deliveryDate: Date;

  @Column({
    type: 'enum',
    enum: PaymentMethod,
    nullable: true,
  })
  paymentMethod: PaymentMethod;

  @Column({ nullable: true })
  proofOfPayment: string;

  @ManyToOne(() => User, (user) => user)
  @JoinColumn({ name: 'customerId' })
  customer: User;

  @Column()
  customerId: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'sellerId' })
  seller: User;

  @Column()
  sellerId: number;

  @Column({ nullable: true })
  sellerNotes: string;

  @Column({ nullable: true })
  adminNotes: string;
}

@Entity()
export class OrderDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  orderId: number;

  @ManyToOne(() => Order, (order) => order.details)
  @JoinColumn({ name: 'orderId' })
  order: Order;

  @Column()
  productId: string;

  @ManyToOne(() => Product, (product) => product.id)
  @JoinColumn({ name: 'productId' })
  product: Product;

  @Column()
  quantity: number;

  @Column('float')
  unitPrice: number;

  @Column('float')
  originalTotalPrice: number;

  @Column('float')
  unitNegotiablePrice: number;

  @Column('float')
  totalPrice: number;

  @Column('float')
  totalNegotiablePrice: number;

  @Column({
    type: 'enum',
    enum: PriceStatus,
    default: PriceStatus.CURRENT,
  })
  status: PriceStatus;
}

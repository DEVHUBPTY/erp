import { Product } from "@/product/entity/product.enitty";
import { Entity, ManyToOne, JoinColumn, PrimaryGeneratedColumn, Column } from "typeorm";
import { Order } from "./order.entity";
import { PriceStatus } from "./order.types";

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

import { User } from "@/user/entity/user.enity";
import { Entity, OneToMany, Column, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from "typeorm";
import { OrderDetail } from "./detail.entity";
import { OrderStatus, PaymentMethod } from "./order.types";

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

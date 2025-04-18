import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { Column } from "typeorm";
import { Supplier } from "./supplier.entity";
import { Category } from "./category.entity";

@Entity()
export class Product {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true, generated: 'uuid' })
    productId: string;

    @Column()
    name: string;

    @Column({ nullable: true })
    description: string;

    @Column({ nullable: false })
    barcode: string;

    @Column({ nullable: false })
    image: string;

    @Column({ nullable: true })
    supplierId: number;

    @ManyToOne(() => Supplier, (supplier) => supplier.products)
    @JoinColumn({ name: 'supplierId' })
    supplier: Supplier;

    @Column()
    categoryId: number;

    @ManyToOne(() => Category, (category) => category.products)
    @JoinColumn({ name: 'categoryId' })
    category: Category;

    @Column({ type: 'float', default: 0 })
    price: number;

    @Column({ default: 0 })
    stock: number;

    @Column({ type: "timestamp", nullable: true })
    expiration: Date | null;
}
import { Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { Column } from "typeorm";
import { Product } from "./product.enitty";

@Entity()
export class Supplier {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;

    @Column({ nullable: true })
    email: string;

    @Column({ nullable: true })
    phone: string;

    @OneToMany(() => Product, (product) => product.supplier)
    products: Product[];
}

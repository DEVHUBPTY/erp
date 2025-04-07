import { Column, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { Entity } from "typeorm";
import { Product } from "./product.enitty";

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;

    @OneToMany(() => Product, (product) => product.category)
    products: Product[];
}
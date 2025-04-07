import { Column, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { Entity } from "typeorm";
import { User } from "./user.enity";

@Entity()
export class Role {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true, nullable: false })
    name: string;

    @OneToMany(() => User, (user) => user.role)
    users: User[];
}

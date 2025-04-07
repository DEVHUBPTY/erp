import { Column, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

import { Entity } from "typeorm";
import { User } from "./user.enity";

@Entity()
export class AccountStatus {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'float', default: 0 })
    balance: number; // 💰 monto que debe o tiene a favor

    @Column({ type: 'boolean', default: false })
    isDelinquent: boolean; // 🔴 si está moroso

    @OneToOne(() => User, (user) => user.accountStatus)
    @JoinColumn()
    user: User;
}

import { AccountStatus } from "./account.entity";

import { Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, JoinColumn } from "typeorm";

import { Column } from "typeorm";
import { Role } from "./role.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true, nullable: false, generated: 'uuid' })
    userId: string;

    @Column({ unique: true, nullable: false })
    email: string;

    @Column({ nullable: false })
    password: string;

    @Column()
    name: string;

    @Column({ nullable: true })
    roleId: number;

    @Column({ nullable: true })
    address: string;

    @Column({ nullable: true })
    phone: string;

    @ManyToOne(() => Role, (role) => role.users)
    @JoinColumn({ name: 'roleId' })
    role: Role;

    @OneToOne(() => AccountStatus, (accountStatus) => accountStatus.user, {
        cascade: true,
    })
    accountStatus: AccountStatus;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
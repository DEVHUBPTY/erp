import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Role {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true, nullable: false })
    name: string;

    @OneToMany(() => User, user => user.role)
    users: User[];
}


@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true, nullable: false })
    email: string;

    @Column({ nullable: false })
    password: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => Role, role => role.users, { nullable: false })
    role: Role;

    @OneToOne(() => AccountStatus, (status) => status.user, { cascade: true, nullable: true })
    accountStatus: AccountStatus;
}

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
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: false })
  name: string;

  @OneToMany(() => User, (user) => user.role)
  users: User[];
}

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

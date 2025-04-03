import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Cart } from './cart.entity';
import { PriceStatus } from '../order/order.entity';
import { Product } from '@/product/product.entity';

@Entity()
export class CartProductList {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cartId: number;

  @ManyToOne(() => Cart, (cart) => cart.productList)
  @JoinColumn({ name: 'cartId' })
  cart: Cart;

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
  unitNegotiablePrice: number;

  @Column('float')
  totalPrice: number;

  @Column('float')
  totalNegotiablePrice: number;
}

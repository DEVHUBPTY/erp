import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Cart } from './cart.entity';
import { ProductVariant } from '@product/product.entity';
import { PriceStatus } from '../order/order.entity';

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
  productVariantId: number;

  @ManyToOne(() => ProductVariant)
  @JoinColumn({ name: 'productVariantId' })
  productVariant: ProductVariant;

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

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { Cart } from './cart.entity';
import { UserModule } from '../user/user.module';
import { ProductModule } from '../product/product.module';
import { CartProductList } from './cart-product-list.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cart, CartProductList]),
    UserModule,
    ProductModule,
  ],
  controllers: [CartController],
  providers: [CartService],
  exports: [CartService],
})
export class CartModule {}

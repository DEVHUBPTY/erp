import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrdersService } from './order.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entity/order.entity';
import { OrderDetail } from './entity/detail.entity';
import { Product } from '@/product/entity/product.enitty';
import { User } from '@/user/entity/user.enity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderDetail, Product, User])],
  providers: [OrdersService],
  controllers: [OrderController],
})
export class OrderModule { }

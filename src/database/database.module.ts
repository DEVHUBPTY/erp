import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { User } from 'src/user/entity/user.enity';
import { Role } from 'src/user/entity/role.entity';
import { AccountStatus } from 'src/user/entity/account.entity';
import { Cart } from '@/cart/entity/cart.entity';
import { CartProductList } from '@/cart/entity/cart-product-list.entity';
import { Supplier } from 'src/product/entity/supplier.entity';
import { Product } from 'src/product/entity/product.enitty';
import { Order } from 'src/order/entity/order.entity';
import { OrderDetail } from 'src/order/entity/detail.entity';
import { Category } from 'src/product/entity/category.entity';
import { AuthToken } from '@/auth/entity/auth.entity';
import { RefreshToken } from '@/auth/entity/refresh.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
// Importa otras entidades aquí

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get<string>('DATABASE_USERNAME'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        entities: [User, Role, AccountStatus, Cart, CartProductList, Product, Supplier, Order, OrderDetail, Category, AuthToken, RefreshToken],
        synchronize: true, // ⚠️ Solo para desarrollo
      }),
    }),
  ],
})
export class DatabaseModule { }

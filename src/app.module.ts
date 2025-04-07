import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { OrderModule } from './order/order.module';
import { CartModule } from './cart/cart.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [ProductModule, UserModule, DatabaseModule, OrderModule, CartModule, AuthModule, ConfigModule.forRoot({
    isGlobal: true,
  }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

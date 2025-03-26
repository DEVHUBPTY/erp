import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { OrderModule } from './order/order.module';
import { CartModule } from './cart/cart.module';

@Module({
  imports: [ProductModule, UserModule, DatabaseModule, OrderModule, CartModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

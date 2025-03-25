import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InventaryModule } from './product/product.module';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [InventaryModule, UserModule, DatabaseModule, OrderModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { Product } from './entity/product.enitty';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entity/category.entity';
import { Supplier } from './entity/supplier.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Category, Supplier])],
  providers: [ProductService],
  controllers: [ProductController],
})
export class ProductModule { }

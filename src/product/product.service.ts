import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import {
  GetProductResponseDto,
  CreateProductDto,
  UpdateProductDto,
} from './product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async getAllProducts(): Promise<GetProductResponseDto[]> {
    const products = await this.productRepository.find({
      relations: ['category', 'supplier'],
    });

    return products.map((product) => ({
      id: product.id,
      productId: product.productId,
      name: product.name,
      description: product.description,
      barcode: product.barcode,
      image: product.image,
      category: {
        id: product.category.id,
        name: product.category.name,
      },
      brand: {
        id: product.supplier.id,
        name: product.supplier.name,
      },
      price: product.price,
      stock: product.stock,
      expiration: product.expiration || undefined,
    }));
  }

  async getProductById(id: string): Promise<GetProductResponseDto> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['category', 'supplier'],
    });

    if (!product) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }

    return {
      id: product.id,
      name: product.name,
      description: product.description,
      barcode: product.barcode,
      image: product.image,
      category: {
        id: product.category.id,
        name: product.category.name,
      },
      brand: {
        id: product.supplier.id,
        name: product.supplier.name,
      },
      price: product.price,
      stock: product.stock,
      expiration: product.expiration || undefined,
    };
  }

  async create(createProductDto: CreateProductDto) {
    const product = new Product();
    product.name = createProductDto.name;
    product.description = createProductDto.description;
    product.barcode = createProductDto.barcode;
    product.image = createProductDto.image;
    product.categoryId = createProductDto.categoryId;
    product.supplierId = createProductDto.supplierId;
    product.price = createProductDto.price;
    product.stock = createProductDto.stock;
    product.expiration = createProductDto.expiration || null;

    await this.productRepository.save(product);
    return this.getProductById(product.id);
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['category', 'supplier'],
    });

    if (!product) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }

    // Update product fields
    product.name = updateProductDto.name;
    product.description = updateProductDto.description;
    product.barcode = updateProductDto.barcode;
    product.image = updateProductDto.image;
    product.categoryId = updateProductDto.categoryId;
    product.supplierId = updateProductDto.supplierId;
    product.price = updateProductDto.price;
    product.stock = updateProductDto.stock;
    product.expiration = updateProductDto.expiration || null;

    return this.getProductById(id);
  }

  async delete(id: string) {
    const product = await this.productRepository.findOne({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }

    await this.productRepository.remove(product);
    return { message: `Producto con ID ${id} ha sido eliminado` };
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product, ProductVariant } from './product.entity';
import { GetProductResponseDto, CreateProductDto, UpdateProductDto } from './product.dto';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>
    ) { }

    async getAllProducts(): Promise<GetProductResponseDto[]> {
        const products = await this.productRepository.find({
            relations: ['category', 'supplier', 'variants', 'variants.attributes', 'variants.attributes.attribute', 'variants.attributes.value']
        });

        return products.map(product => ({
            id: product.id,
            productId: product.productId,
            name: product.name,
            description: product.description,
            barcode: product.barcode,
            image: product.image,
            category: {
                id: product.category.id,
                name: product.category.name
            },
            brand: {
                id: product.supplier.id,
                name: product.supplier.name
            },
            variants: product.variants.map(variant => ({
                id: variant.id,
                price: variant.price,
                stock: variant.stock,
                isDefault: variant.isDefault,
                expiration: variant.expiration,
                attributes: variant.attributes.map(attribute => ({
                    id: attribute.attribute.id,
                    name: attribute.attribute.name,
                    value: attribute.value.value
                }))
            }))
        }));
    }

    async getProductById(id: string): Promise<GetProductResponseDto> {
        const product = await this.productRepository.findOne({
            where: { id },
            relations: ['category', 'supplier', 'variants', 'variants.attributes', 'variants.attributes.attribute', 'variants.attributes.value']
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
                name: product.category.name
            },
            brand: {
                id: product.supplier.id,
                name: product.supplier.name
            },
            variants: product.variants.map(variant => ({
                id: variant.id,
                price: variant.price,
                stock: variant.stock,
                isDefault: variant.isDefault,
                expiration: variant.expiration,
                attributes: variant.attributes.map(attribute => ({
                    id: attribute.attribute.id,
                    name: attribute.attribute.name,
                    value: attribute.value.value
                }))
            }))
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

        // Create variants
        if (createProductDto.variants && createProductDto.variants.length > 0) {
            product.variants = createProductDto.variants.map(variantDto => {
                const variant = new ProductVariant();
                variant.price = variantDto.price;
                variant.stock = variantDto.stock;
                variant.isDefault = variantDto.isDefault;
                variant.expiration = variantDto.expiration;
                variant.product = product;
                return variant;
            });
        }

        await this.productRepository.save(product);
        return this.getProductById(product.id);
    }

    async update(id: string, updateProductDto: UpdateProductDto) {
        const product = await this.productRepository.findOne({
            where: { id },
            relations: ['category', 'supplier', 'variants', 'variants.attributes']
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

        // Update variants
        if (updateProductDto.variants && updateProductDto.variants.length > 0) {
            // Update existing variants
            updateProductDto.variants.forEach(variantDto => {
                const existingVariant = product.variants.find(v => v.id === variantDto.id);
                if (existingVariant) {
                    existingVariant.price = variantDto.price;
                    existingVariant.stock = variantDto.stock;
                    existingVariant.isDefault = variantDto.isDefault;
                    existingVariant.expiration = variantDto.expiration;
                } else {
                    // If variant doesn't exist, create new one
                    const newVariant = new ProductVariant();
                    newVariant.price = variantDto.price;
                    newVariant.stock = variantDto.stock;
                    newVariant.isDefault = variantDto.isDefault;
                    newVariant.expiration = variantDto.expiration;
                    newVariant.productId = product.id;
                    newVariant.product = product;
                    product.variants.push(newVariant);
                }
            });
        }

        // Save updated product with variants
        await this.productRepository.save(product);

        return this.getProductById(id);
    }

    async delete(id: string) {
        const product = await this.productRepository.findOne({
            where: { id }
        });

        if (!product) {
            throw new NotFoundException(`Producto con ID ${id} no encontrado`);
        }

        await this.productRepository.remove(product);
        return { message: `Producto con ID ${id} ha sido eliminado` };
    }
}
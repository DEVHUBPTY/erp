import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn, Unique } from 'typeorm';

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;

    @OneToMany(() => Product, product => product.category)
    products: Product[];
}

@Entity()
export class Attribute {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;

    @OneToMany(() => AttributeValue, value => value.attribute)
    values: AttributeValue[];
}

@Entity()
@Unique(['attributeId', 'value'])
export class AttributeValue {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    attributeId: number;

    @ManyToOne(() => Attribute, attribute => attribute.values)
    @JoinColumn({ name: 'attributeId' })
    attribute: Attribute;

    @Column()
    value: string;

    @OneToMany(() => VariantAttribute, variantAttribute => variantAttribute.value)
    variantAttributes: VariantAttribute[];
}

@Entity()
export class Supplier {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;

    @Column({ nullable: true })
    email: string;

    @Column({ nullable: true })
    phone: string;

    @OneToMany(() => Product, product => product.supplier)
    products: Product[];
}



@Entity()
export class Product {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true, generated: 'uuid' })
    productId: string;

    @Column()
    name: string;

    @Column({ nullable: true })
    description: string;

    @Column({ nullable: false })
    barcode: string;

    @Column({ nullable: false })
    image: string;

    @Column({ nullable: true })
    supplierId: number;

    @ManyToOne(() => Supplier, supplier => supplier.products)
    @JoinColumn({ name: 'supplierId' })
    supplier: Supplier;

    @Column()
    categoryId: number;

    @ManyToOne(() => Category, category => category.products)
    @JoinColumn({ name: 'categoryId' })
    category: Category;

    @OneToMany(() => ProductVariant, variant => variant.product)
    variants: ProductVariant[];
}

@Entity()
export class ProductVariant {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true, generated: 'uuid' })
    variantId: string;

    @Column()
    productId: string;

    @ManyToOne(() => Product, product => product.variants)
    @JoinColumn({ name: 'productId' })
    product: Product;

    @Column({ type: 'float', default: 0 })
    price: number;

    @Column({ default: 0 })
    stock: number;

    @Column({ default: false })
    isDefault: boolean;

    @Column({ nullable: true })
    expiration: Date;

    @OneToMany(() => VariantAttribute, attribute => attribute.productVariant)
    attributes: VariantAttribute[];

}


// TODO : VERIFICAR SI ES NECESARIO
@Entity()
@Unique(['productVariantId', 'attributeId'])
export class VariantAttribute {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    productVariantId: number;

    @ManyToOne(() => ProductVariant, variant => variant.attributes)
    @JoinColumn({ name: 'productVariantId' })
    productVariant: ProductVariant;

    @Column()
    attributeId: number;

    @ManyToOne(() => Attribute, attribute => attribute.values)
    @JoinColumn({ name: 'attributeId' })
    attribute: Attribute;

    @Column()
    valueId: number;

    @ManyToOne(() => AttributeValue, value => value.variantAttributes)
    @JoinColumn({ name: 'valueId' })
    value: AttributeValue;
}
import { Injectable, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { CreateCartDto, UpdateCartDto } from './cart.dto';
import { Cart } from './entity/cart.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
  ) { }

  async createCart(createCartDto: CreateCartDto): Promise<Cart> {
    try {
      const cart = this.cartRepository.create(createCartDto);
      return await this.cartRepository.save(cart);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getCartById(id: string): Promise<Cart> {
    try {
      const cart = await this.cartRepository.findOne({
        where: { id: parseInt(id) },
        relations: ['productList', 'customer', 'seller'],
      });

      if (!cart) {
        throw new NotFoundException('Carrito no encontrado');
      }

      return cart;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async updateCart(id: string, updateCartDto: UpdateCartDto): Promise<Cart> {
    try {
      const cart = await this.getCartById(id);
      const updatedCart = this.cartRepository.merge(cart, updateCartDto);
      return await this.cartRepository.save(updatedCart);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async deleteCart(id: string): Promise<{ message: string }> {
    try {
      const cart = await this.getCartById(id);
      if (!cart) {
        throw new NotFoundException('Carrito no encontrado');
      }
      await this.cartRepository.remove(cart);
      return { message: `Carrito con ID ${id} ha sido eliminado` };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

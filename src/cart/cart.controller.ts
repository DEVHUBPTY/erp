import { CartService } from './cart.service';
import { Controller, Param, Patch, Post, Body } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  createCart(@Body() createCartDto: CreateCartDto) {
    return this.cartService.createCart(createCartDto);
  }
}

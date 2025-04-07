import { CartService } from './cart.service';
import { Controller, Param, Patch, Post, Body, Get, Delete } from '@nestjs/common';
import { CreateCartDto, UpdateCartDto } from './cart.dto';
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) { }

  @Get(":id")
  getCartById(@Param('id') id: string) {
    return this.cartService.getCartById(id);
  }

  @Post()
  createCart(@Body() createCartDto: CreateCartDto) {
    return this.cartService.createCart(createCartDto);
  }

  @Patch(":id")
  updateCart(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
    return this.cartService.updateCart(id, updateCartDto);
  }

  @Delete(":id")
  deleteCart(@Param('id') id: string) {
    return this.cartService.deleteCart(id);
  }
}

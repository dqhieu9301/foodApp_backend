import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CartProductService } from './cart-product.service';
import { CartProductCreateDTO } from './dto/cart-product-create.dto';
import { AuthGuard } from '../auth/auth.guard';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { CartProductUpdateDTO } from './dto/cart-product-update.dto';
import { BuyProductsInCartDTO } from './dto/buy-products-in-cart.dto';

@Controller('/api/cart-product')
@ApiTags("Cart-Product")
@ApiSecurity('JWT-auth')
export class CartProductController {

  constructor(
        private readonly cartProductService: CartProductService
  ) {}

  @Post('/add-to-cart')
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  async addProductToCart(@Body() data: CartProductCreateDTO, @Req() request: any ) {
    return this.cartProductService.addProductToCart(data, request.user);
  }

  @Delete('/delete/:id')
  @UseGuards(AuthGuard)
  async deleteProductInCart(@Param('id', ParseIntPipe) id: number,@Req() request: any) {
    return this.cartProductService.deleteProductInCart(id,request.user);
  }
  
  @Put('/update/:id')
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  async updateProductInCart(@Param('id', ParseIntPipe) id: number, @Req() request: any, @Body() data: CartProductUpdateDTO) {
    return this.cartProductService.updateProductInCart(id,request.user,data);
  }

  @Get('/getAll')
  @UseGuards(AuthGuard)
  async getAllProductInCart(@Req() request: any) {
    return this.cartProductService.getAllListProductInCart(request.user);
  }

  @Get('/get-product-bought')
  @UseGuards(AuthGuard)
  async getAllListProductBought(@Req() request: any) {
    return this.cartProductService.getAllListProductBought(request.user);
  }

  @Post('/buy-products-in-cart')
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  async buyProductsInCart(@Req() request: any, @Body() data: BuyProductsInCartDTO) {
    return this.cartProductService.buyProductsInCart(request.user,data);
  }

  @Get('/get-list-product-history')
  @UseGuards(AuthGuard)
  async getListProductHistory(@Req() request: any) {
    return this.cartProductService.getListProductHistory(request.user);
  }
}

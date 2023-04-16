import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartProduct } from '../entities/cart-product.entity';
import { Repository } from 'typeorm';
import { Account } from '../entities/account.entity';
import { Product } from '../entities/product.entity';
import { CartProductCreateDTO } from './dto/cart-product-create.dto';
import { CartProductUpdateDTO } from './dto/cart-product-update.dto';

@Injectable()
export class CartProductService {
  constructor(
        @InjectRepository(CartProduct) private readonly cartProductRepository: Repository<CartProduct>,
        @InjectRepository(Account) private readonly accountRepository: Repository<Account>,
        @InjectRepository(Product) private readonly productRepository: Repository<Product>
  ) {}

  async addProductToCart(data: CartProductCreateDTO, payloadJwt: {id: number}) {
    const accountId = payloadJwt.id;
    const product = await this.productRepository.findOne({ where: {name: data.name }});
    if(!product) {
      throw new BadRequestException("Product does not exist");
    }
    const productId = product.id;
    const itemInCart = await this.cartProductRepository
      .createQueryBuilder('cartProduct')
      .innerJoinAndSelect('cartProduct.account', 'account')
      .innerJoinAndSelect('cartProduct.product', 'product')
      .andWhere('cartProduct.accountId = :accountId', {accountId})
      .andWhere('cartProduct.productId = :productId', {productId})
      .getOne();
    if(itemInCart) {
      await this.cartProductRepository.update({id: itemInCart.id}, { quantity: data.quantity + itemInCart.quantity});
    }
    else {
      const account = await this.accountRepository.findOne({ where: {id: accountId}});
      const newData = {
        ...data,
        account: account,
        product: product,
        path: product.path
      };
      await this.cartProductRepository.save(newData);
    }
    return {
      message: "Add to cart success"
    };
  }

  async deleteProductInCart(productId: number, payloadJwt: {id: number}) {
    const accountId = payloadJwt.id;
    const itemInCart = await this.cartProductRepository
      .createQueryBuilder('cartProduct')
      .innerJoinAndSelect('cartProduct.account', 'account')
      .andWhere('cartProduct.accountId = :accountId', {accountId})
      .andWhere('cartProduct.id = :productId', {productId})
      .getOne();
    if(!itemInCart) {
      throw new BadRequestException("Product does not exist");
    }
    await this.cartProductRepository.delete({id: itemInCart.id});
    return {
      message: "delete success"
    };
  }

  async updateProductInCart(productId: number,payloadJwt: {id: number}, data: CartProductUpdateDTO) {
    const accountId = payloadJwt.id;
    const itemInCart = await this.cartProductRepository
      .createQueryBuilder('cartProduct')
      .innerJoinAndSelect('cartProduct.account', 'account')
      .andWhere('cartProduct.accountId = :accountId', {accountId})
      .andWhere('cartProduct.id = :productId', {productId})
      .getOne();
    if(!itemInCart) {
      throw new BadRequestException("Product does not exist");
    }
    await this.cartProductRepository.update({id: productId}, {quantity: data.quantity});
    return {
      message: "update success"
    };
  }

  async getAllListProductInCart(payloadJwt: {id: number}) {
    const accountId = payloadJwt.id;
    const itemInCarts = await this.cartProductRepository
      .createQueryBuilder('cartProduct')
      .innerJoinAndSelect('cartProduct.account', 'account')
      .andWhere('cartProduct.accountId = :accountId', {accountId})
      .getMany();
    return {
      listProduct: itemInCarts
    };
  }
}

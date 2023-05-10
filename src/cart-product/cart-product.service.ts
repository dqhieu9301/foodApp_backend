import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { CartProduct } from '../entities/cart-product.entity';
import { EntityManager, Repository } from 'typeorm';
import { Account } from '../entities/account.entity';
import { Product } from '../entities/product.entity';
import { CartProductCreateDTO } from './dto/cart-product-create.dto';
import { CartProductUpdateDTO } from './dto/cart-product-update.dto';

@Injectable()
export class CartProductService {
  constructor(
        @InjectRepository(CartProduct) private readonly cartProductRepository: Repository<CartProduct>,
        @InjectRepository(Account) private readonly accountRepository: Repository<Account>,
        @InjectRepository(Product) private readonly productRepository: Repository<Product>,
        @InjectEntityManager() private readonly entityManager: EntityManager,

  ) {}

  async addProductToCart(data: CartProductCreateDTO, payloadJwt: {id: number}) {
    const accountId = payloadJwt.id;
    
    const product = await this.productRepository.findOne({ where: {id: data.id }});
    if(!product) {
      throw new BadRequestException("Product does not exist");
    }

    if(data.quantity > product.quantity) {
      throw new BadRequestException("The current quantity is not larger than the current quantity");
    }

    const productId = product.id;
    const status = false;

    const itemInCart = await this.cartProductRepository
      .createQueryBuilder('cartProduct')
      .innerJoinAndSelect('cartProduct.account', 'account')
      .innerJoinAndSelect('cartProduct.product', 'product')
      .andWhere('cartProduct.accountId = :accountId', {accountId})
      .andWhere('cartProduct.productId = :productId', {productId})
      .andWhere('cartProduct.status = :status', {status})
      .getOne();
    if(itemInCart) {
      await this.cartProductRepository.update({id: itemInCart.id}, { quantity: data.quantity + itemInCart.quantity});
    }
    else {
      const account = await this.accountRepository.findOne({ where: {id: accountId}});
      const newData = {
        quantity: data.quantity,
        account: account,
        product: product,
        status: false
      };
      await this.productRepository.update({id: productId}, {quantity: product.quantity - data.quantity});
      await this.cartProductRepository.save(newData);
    }
    return {
      message: "Add to cart success"
    };
  }

  async deleteProductInCart(id: number, payloadJwt: {id: number}) {
    const accountId = payloadJwt.id;
    const itemInCart = await this.cartProductRepository
      .createQueryBuilder('cartProduct')
      .innerJoinAndSelect('cartProduct.account', 'account')
      .andWhere('cartProduct.accountId = :accountId', {accountId})
      .andWhere('cartProduct.id = :id', {id})
      .getOne();
    if(!itemInCart) {
      throw new BadRequestException("Product does not exist");
    }
    await this.cartProductRepository.softDelete({id: itemInCart.id});
    return {
      message: "delete success"
    };
  }

  async updateProductInCart(id: number,payloadJwt: {id: number}, data: CartProductUpdateDTO) {
    const accountId = payloadJwt.id;
    const itemInCart = await this.cartProductRepository
      .createQueryBuilder('cartProduct')
      .innerJoinAndSelect('cartProduct.account', 'account')
      .andWhere('cartProduct.accountId = :accountId', {accountId})
      .andWhere('cartProduct.id = :id', {id})
      .getOne();
    if(!itemInCart) {
      throw new BadRequestException("Product does not exist");
    }
    await this.cartProductRepository.update({id: id}, {quantity: data.quantity});
    return {
      message: "update success"
    };
  }

  async getAllListProductInCart(payloadJwt: {id: number}) {
    const accountId = payloadJwt.id;
    const status = false;
    const itemInCarts = await this.cartProductRepository
      .createQueryBuilder('cartProduct')
      .innerJoinAndSelect('cartProduct.product', 'product')
      .where('cartProduct.accountId = :accountId and cartProduct.status = :status and cartProduct.productId = product.id', {accountId, status})
      .select(['cartProduct.id', 'product.name', 'cartProduct.quantity', 'product.cost', 'product.path'])
      .getMany();
    return {
      listProduct: itemInCarts
    };
  }

  async getAllListProductBought(payloadJwt: {id: number}) {
    const accountId = payloadJwt.id;
    const status = true;
    const itemInCarts = await this.cartProductRepository
      .createQueryBuilder('cartProduct')
      .innerJoinAndSelect('cartProduct.product', 'product')
      .where('cartProduct.accountId = :accountId and cartProduct.status = :status and cartProduct.productId = product.id', {accountId, status})
      .select(['cartProduct.id', 'product.name', 'cartProduct.quantity', 'product.cost', 'product.path'])
      .getMany();
    return {
      listProduct: itemInCarts
    };
  }

  async buyProductsInCart(payloadJwt: {id: number}) {
    const accountId = payloadJwt.id;
    const listIdProductWillBuy = await this.cartProductRepository
      .createQueryBuilder('cart_product')
      .select(['cart_product.id as id'])
      .where('cart_product.accountId = :accountId and cart_product.status = false', {accountId})
      .getRawMany();
    await Promise.all(
      listIdProductWillBuy.map(async (item: {id: number}) => {
        await this.cartProductRepository.update({id: item.id}, { status: true });
      })
    );
    return {
      message: "buy product success"
    };
  }

  async getListProductHistory(payloadJwt: {id: number}) {
    const accountId = payloadJwt.id;
    const status = true;
    const query = `select product.id, product.name, cart_product.quantity, product.path, cart_product.updated_at, product.cost
      from cart_product inner join product on product.id = cart_product.productId
      where  cart_product.accountId = ${accountId} and cart_product.status = ${status}`;
    const listProductHistory = await this.cartProductRepository.query(query);

    return {
      listProductHistory: listProductHistory
    };
  }

  async randomProduct() {
    const listProductRandom = await this.productRepository
      .createQueryBuilder('product')
      .select(['product.id', 'product.name', 'product.cost', 'product.path', 'product.describe', 'product.type', 'product.quantity'])
      .orderBy('RAND()')
      .take(4)
      .getMany();
    
    return {
      listProductRandom
    };
  }
}

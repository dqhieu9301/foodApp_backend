import { Module } from '@nestjs/common';
import { CartProductController } from './cart-product.controller';
import { CartProductService } from './cart-product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartProduct } from '../entities/cart-product.entity';
import { Account } from '../entities/account.entity';
import { Product } from '../entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CartProduct, Account, Product])],
  controllers: [CartProductController],
  providers: [CartProductService]
})
export class CartProductModule {}

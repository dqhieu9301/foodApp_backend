import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';
import { CartProductModule } from './cart-product/cart-product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { User } from './entities/user.entity';
import { Account } from './entities/account.entity';
import { CartProduct } from './entities/cart-product.entity';
import { Product } from './entities/product.entity';
import { Token } from './entities/token.entity';
import { CloudinaryModule } from 'nestjs-cloudinary';
import * as cloudinary from 'cloudinary';
dotenv.config();

@Module({
  imports: [
    CloudinaryModule.forRoot({
      cloud_name: "doe8iuzbo",
      api_key: process.env.API_KEY_CLOUD,
      api_secret: process.env.API_SECRET_KEY_CLOUD,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: process.env.PASSWORD_DB,
      database: 'foodAppDB',
      entities: [User, Account, CartProduct, Product, Token],
      // synchronize: true
    }),
    AuthModule, ProductModule, UserModule, CartProductModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'CLOUDINARY',
      useValue: cloudinary.v2,

    }
  ],
})
export class AppModule {}

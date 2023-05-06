/* eslint-disable @typescript-eslint/no-unused-vars */
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
import { ConfigModule, ConfigService } from '@nestjs/config';
dotenv.config();

@Module({
  imports: [
    CloudinaryModule.forRoot({
      cloud_name: "doe8iuzbo",
      api_key: process.env.API_KEY_CLOUD,
      api_secret: process.env.API_SECRET_KEY_CLOUD,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: process.env.HOST_DB,
        port: Number(process.env.PORT_DB),
        username: process.env.USERNAME_DB,
        password: process.env.PASSWORD_DB,
        database: process.env.NAME_DB,
        entities: [User, Account, CartProduct, Product, Token],
        softDelete: true,
        // synchronize: true,
      })

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

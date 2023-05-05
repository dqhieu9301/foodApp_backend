import { PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Entity } from 'typeorm';
import { CartProduct } from './cart-product.entity';
import { BaseEntity } from './base.entity';

@Entity()
export class Account extends BaseEntity{
    @PrimaryGeneratedColumn('increment')
      id: number;

    @Column()
      username: string;

    @Column()
      password: string;

    @OneToMany(() => CartProduct, (cartProduct) => cartProduct.account)
      cartProducts: CartProduct[];
}
import { ManyToOne } from 'typeorm';
import { Column } from 'typeorm';
import { PrimaryGeneratedColumn } from 'typeorm';
import { Entity } from 'typeorm';
import { Product } from './product.entity';
import { Account } from './account.entity';
import { BaseEntity } from './base.entity';

@Entity()
export class CartProduct extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
      id: number;

    @Column()
      quantity: number;
    
    @Column()
      status: boolean;

    @ManyToOne(() => Account, (account) => account.cartProducts)
      account: Account;
    @ManyToOne(() => Product, (product) => product.cartProducts)
      product: Product;
}
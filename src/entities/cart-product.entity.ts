import { CreateDateColumn, ManyToOne } from 'typeorm';
import { Column } from 'typeorm';
import { PrimaryGeneratedColumn } from 'typeorm';
import { Entity } from 'typeorm';
import { Product } from './product.entity';
import { Account } from './account.entity';

@Entity()
export class CartProduct {
    @PrimaryGeneratedColumn('increment')
      id: number;

    @Column()
      quantity: number;
      
    @CreateDateColumn()
      createAt: Date;

    @ManyToOne(() => Account, (account) => account.cartProducts)
      account: Account;
    @ManyToOne(() => Product, (product) => product.cartProducts)
      product: Product;
}
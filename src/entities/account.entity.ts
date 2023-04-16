import { PrimaryGeneratedColumn, CreateDateColumn, Column, OneToMany } from 'typeorm';
import { Entity } from 'typeorm';
import { CartProduct } from './cart-product.entity';

@Entity()
export class Account {
    @PrimaryGeneratedColumn('increment')
      id: number;

    @Column()
      username: string;

    @Column()
      password: string;

    @CreateDateColumn()
      createAt: Date;

      @OneToMany(() => CartProduct, (cartProduct) => cartProduct.account)
        cartProducts: CartProduct[];
}
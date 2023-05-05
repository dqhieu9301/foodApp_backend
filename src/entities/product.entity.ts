import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { CartProduct } from "./cart-product.entity";
import { BaseEntity } from "./base.entity";

@Entity()
export class Product extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
      id: number;

    @Column()
      name: string;

    @Column()
      type: string;

    @Column()
      cost: number;

    @Column()
      describe: string;

    @Column()
      quantity: number;

    @Column()
      path: string;

    @OneToMany(() => CartProduct, (cartProduct) => cartProduct.product)
      cartProducts: CartProduct[];
}
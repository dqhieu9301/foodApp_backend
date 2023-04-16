import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { CartProduct } from "./cart-product.entity";

@Entity()
export class Product {
    @PrimaryGeneratedColumn('increment')
      id: number;

    @Column()
      name: string;

    @Column()
      type: string;

    @Column()
      cost: number;

    @Column()
      quantity: number;

    @CreateDateColumn()
      createAt: Date;

    @Column()
      path: string;
      @OneToMany(() => CartProduct, (cartProduct) => cartProduct.product)
        cartProducts: CartProduct[];
}
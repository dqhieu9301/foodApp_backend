import { Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";
import { Account } from "./account.entity";
import { BaseEntity } from "./base.entity";

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
      id: number;

    @Column()
      fullname: string;

    @Column()
      address: string;
    
    @Column()
      phone: string;
      
    @OneToOne(() => Account)
    @JoinColumn()
      account: Account;
}
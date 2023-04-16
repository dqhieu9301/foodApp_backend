import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";
import { Account } from "./account.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn('increment')
      id: number;

    @Column()
      fullname: string;

    @Column()
      address: string;
    
    @Column()
      phone: string;
      
    @CreateDateColumn()
      createAt: Date;

      @OneToOne(() => Account)
      @JoinColumn()
        account: Account;
}
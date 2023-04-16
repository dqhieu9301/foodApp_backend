import { Column } from 'typeorm';
import { PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { Entity } from 'typeorm';
import { Account } from './account.entity';

@Entity()
export class Token {
    @PrimaryGeneratedColumn('increment')
      id: number;

    @Column()
      accessToken: string;

    @Column()
      refreshToken: string;

    @OneToOne(() => Account)
    @JoinColumn()
      account: Account;
}
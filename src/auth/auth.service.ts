import { BadRequestException, Injectable } from '@nestjs/common';
import { Account } from '../entities/account.entity';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { AccountRegisterDTO } from './dto/account-register.dto';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountLoginDTO } from './dto/account-login.dto';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Account) private readonly accountRepository: Repository<Account>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService
  ) {}
  async register(dataRegister: AccountRegisterDTO) {
    const account = await this.accountRepository.findOne({ where: { username: dataRegister.username } });
    if(account) {
      throw new BadRequestException("Username exist");
    }

    const saltOrRounds = 10;
    const hashPassword = await bcrypt.hash(dataRegister.password, saltOrRounds);

    const accountSave = {
      username: dataRegister.username, 
      password: hashPassword
    };
    await this.accountRepository.save(accountSave);
    await this.userRepository.save({
      fullname: dataRegister.fullname,
      address: dataRegister.address,
      phone: dataRegister.phone,
      account: accountSave
    });
    return {
      message: "create account success"
    };
  }

  async login(dataLogin: AccountLoginDTO) {
    const { username, password } = dataLogin;
    const account = await this.accountRepository.findOne({ where: {username: username } });
    if(!account) {
      throw new BadRequestException("incorrect username");
    }
    const isMatch = await bcrypt.compare(password, account.password);
    if(!isMatch) {
      throw new BadRequestException("incorrect password");
    }
    
    const payload = { id: account.id };
    const accessToken = await this.jwtService.signAsync(payload, { secret: process.env.SECRET_KEY, expiresIn: "30m" });
    return {
      accessToken: accessToken
    };
  }

  async  getInforUser(payloadJwt: {id: number}) {
    const id = payloadJwt.id;
    const inforUser = await this.userRepository
      .createQueryBuilder('user')
      .innerJoinAndSelect('user.account', 'account')
      .select(['user.id','user.fullname','user.address','user.phone'])
      .andWhere('user.accountId = :id', {id})
      .getOne();
    return {
      inforUser: inforUser
    };
  }
}

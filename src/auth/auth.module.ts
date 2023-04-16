import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Account } from '../entities/account.entity';
import { User } from '../entities/user.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Account, User]), JwtModule.register({global: true})],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}

import { Body, Controller, Get, Post, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AccountRegisterDTO } from './dto/account-register.dto';
import { AuthService } from './auth.service';
import { AccountLoginDTO } from './dto/account-login.dto';
import { AuthGuard } from './auth.guard';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';

@Controller('/api/auth')
@ApiTags('Auth')
export class AuthController {
  constructor(
        private readonly authService: AuthService
  ) {}

    @Post('/register')
    @UsePipes(new ValidationPipe())
  async register(@Body() dataRegister: AccountRegisterDTO) {
    return this.authService.register(dataRegister);
  }

  @Post('/login')
  @UsePipes(new ValidationPipe())
    async login(@Body() dataLogin: AccountLoginDTO) {
      return this.authService.login(dataLogin);
    }

  @ApiSecurity('JWT-auth')
  @Get('/infor-user')
  @UseGuards(AuthGuard)
  async getInforUser(@Req() request: any) {
    return this.authService.getInforUser(request.user);
  }
}

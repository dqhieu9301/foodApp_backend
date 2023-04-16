import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    // @InjectRepository(Token) private readonly tokenRepository: Repository<Token> ,
    private readonly jwtService: JwtService
  ) {}
  async canActivate(context: ExecutionContext,): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException("Unauthorized");
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.SECRET_KEY
      });
      // const inforToken = await this.tokenRepository.findOne({ where: { accessToken: token, idUser: payload.id }});
      // if(!inforToken) {
      //   throw new UnauthorizedException("Unauthorized");
      // }
      request['user'] = payload;
    } catch (err) {
      throw new UnauthorizedException("Unauthorized");
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const headers: any = request.headers;
    const [type, token] = headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}

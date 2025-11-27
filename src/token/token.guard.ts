import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { TokenService } from './token.service';

@Injectable()
export class TokenAuthGuard implements CanActivate {
  constructor(private readonly tokenService: TokenService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const apiToken = request.headers['api-token'] || request.headers['api_token'] || request.headers['authorization'];

    // Validar Existencia de Token
    if (!apiToken) {
      throw new UnauthorizedException('api-token header is required');
    }

    // Validar servicio de tokens
    const ok = await this.tokenService.validateAndConsume(apiToken as string);
    if (!ok) {
      throw new UnauthorizedException('Invalid or exhausted api-token');
    }

    // Si son exitosas las validaciones retorne true
    return true;
  }

}

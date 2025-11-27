import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { TokenService } from './token.service';

@Injectable()
export class TokenAuthGuard implements CanActivate {
  constructor(private readonly tokenService: TokenService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    const apiToken = request.get('api-token') || request.get('api_token') || request.get('authorization');

    // Validar Existencia de Token
    if (!apiToken) {
      throw new UnauthorizedException('api-token header is required');
    }

    // Validar servicio de tokens
    const ok = await this.tokenService.validateAndConsume(apiToken);
    if (!ok) {
      throw new UnauthorizedException('Invalid or exhausted api-token');
    }

    return true;
  }

}

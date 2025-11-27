import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { TokenService } from '../../token/token.service';
import { Request } from 'express';

@Injectable()
export class ApiTokenGuard implements CanActivate {
    constructor(private readonly tokenService: TokenService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest<Request>();

        const headers = request.headers as Record<string, any>;
        const apiToken = (headers['api-token'] as string) || (headers['api_token'] as string) || (headers['authorization'] as string);

        if (!apiToken) {
            throw new UnauthorizedException('api-token header is required');
        }

        const ok = await this.tokenService.validateAndConsume(apiToken);
        if (!ok) throw new UnauthorizedException('Invalid or exhausted api-token');

        return true;
    }

}
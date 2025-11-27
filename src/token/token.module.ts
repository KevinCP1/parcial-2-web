import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { TokenController } from './token.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Token } from './entities/token.entity';
import { TokenAuthGuard } from './token.guard';

@Module({
  controllers: [TokenController],
  providers: [TokenService, TokenAuthGuard],
  exports: [TokenService, TokenAuthGuard],
  imports: [
    TypeOrmModule.forFeature([Token])
  ]
})
export class TokenModule {}

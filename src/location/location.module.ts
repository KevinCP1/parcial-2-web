import { Module } from '@nestjs/common';
import { LocationService } from './location.service';
import { LocationController } from './location.controller';
import { TokenModule } from '../token/token.module';

@Module({
  controllers: [LocationController],
  providers: [LocationService],
  imports: [TokenModule],
})
export class LocationModule {}

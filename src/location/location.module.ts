import { Module } from '@nestjs/common';
import { LocationService } from './location.service';
import { LocationController } from './location.controller';
import { TokenModule } from '../token/token.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Location } from './entities/location.entity';

@Module({
  controllers: [LocationController],
  providers: [LocationService],
  imports: [TokenModule, TypeOrmModule.forFeature([Location])],
})
export class LocationModule {}

import { Module } from '@nestjs/common';
import { CharacterService } from './character.service';
import { CharacterController } from './character.controller';
import { TokenModule } from '../token/token.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Character } from './entities/character.entity';
import { Location } from '../location/entities/location.entity';

@Module({
  controllers: [CharacterController],
  providers: [CharacterService],
  imports: [TokenModule, TypeOrmModule.forFeature([Character, Location])],
})
export class CharacterModule {}

import { Module } from '@nestjs/common';
import { CharacterService } from './character.service';
import { CharacterController } from './character.controller';
import { TokenModule } from '../token/token.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Character } from './entities/character.entity';

@Module({
  controllers: [CharacterController],
  providers: [CharacterService],
  imports: [TokenModule, TypeOrmModule.forFeature([Character])],
})
export class CharacterModule {}

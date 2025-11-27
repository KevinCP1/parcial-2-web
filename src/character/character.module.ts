import { Module } from '@nestjs/common';
import { CharacterService } from './character.service';
import { CharacterController } from './character.controller';
import { TokenModule } from '../token/token.module';

@Module({
  controllers: [CharacterController],
  providers: [CharacterService],
  imports: [TokenModule],
})
export class CharacterModule {}

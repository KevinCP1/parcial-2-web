import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTokenDto } from './dto/create-token.dto';
import { UpdateTokenDto } from './dto/update-token.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Token } from './entities/token.entity';

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(Token)
    private readonly tokenRepository: Repository<Token>,
  ) {}

  async create(createTokenDto: CreateTokenDto) {
    const token = this.tokenRepository.create(createTokenDto as Partial<Token>);
    return this.tokenRepository.save(token);
  }

  async findAll() {
    return this.tokenRepository.find();
  }

  async findOne(id: string) {
    const token = await this.tokenRepository.findOne({ where: { id } });
    if (!token) throw new NotFoundException('Token not found');
    return token;
  }

  async update(id: string, updateTokenDto: UpdateTokenDto) {
    await this.tokenRepository.update(id, updateTokenDto as Partial<Token>);
    return this.findOne(id);
  }

  async remove(id: string) {
    const token = await this.findOne(id);
    await this.tokenRepository.remove(token);
    return { deleted: true };
  }

  async validateAndConsume(apiToken: string): Promise<boolean> {
    const token = await this.tokenRepository.findOne({ where: { token: apiToken } });
    if (!token) return false;
    if (!token.active) return false;
    if (typeof token.reqLeft === 'number' && token.reqLeft <= 0) return false;

    if (typeof token.reqLeft === 'number') {
      token.reqLeft = token.reqLeft - 1;
    }

    await this.tokenRepository.save(token);
    return true;
  }
}

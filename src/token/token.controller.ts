import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TokenService } from './token.service';
import { CreateTokenDto } from './dto/create-token.dto';
import { UpdateTokenDto } from './dto/update-token.dto';
import { TokenAuthGuard } from './token.guard';

@Controller('token')
export class TokenController {
  constructor(private readonly tokenService: TokenService) {}

  @Post()
  create(@Body() createTokenDto: CreateTokenDto) {
    return this.tokenService.create(createTokenDto);
  }

  @Get()
  @UseGuards(TokenAuthGuard)
  findAll() {
    return this.tokenService.findAll();
  }

  @Get(':id')
  @UseGuards(TokenAuthGuard)
  findOne(@Param('id') id: string) {
    return this.tokenService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(TokenAuthGuard)
  update(@Param('id') id: string, @Body() updateTokenDto: UpdateTokenDto) {
    return this.tokenService.update(id, updateTokenDto);
  }

  @Delete(':id')
  @UseGuards(TokenAuthGuard)
  remove(@Param('id') id: string) {
    return this.tokenService.remove(id);
  }
}

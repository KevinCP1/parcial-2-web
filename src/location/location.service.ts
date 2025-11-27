import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Location } from './entities/location.entity';
import { Character } from '../character/entities/character.entity';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,
    @InjectRepository(Character)
    private readonly characterRepository: Repository<Character>,
  ) {}

  async create(createLocationDto: CreateLocationDto) {
    const ownerId = createLocationDto.ownerId;
    const rest: Partial<Location> = {
      name: createLocationDto.name,
      type: createLocationDto.type,
      cost: createLocationDto.cost,
    };

    const location = this.locationRepository.create(rest);
    const savedLocation = await this.locationRepository.save(location);

    if (ownerId) {
      const character = await this.characterRepository.findOne({ where: { id: ownerId }, relations: ['ownership'] });
      if (!character) throw new NotFoundException('Owner character not found');
      if (character.ownership) throw new BadRequestException('Character already owns a property');

      character.ownership = savedLocation;
      await this.characterRepository.save(character);
    }

    return savedLocation;
  }

  async findAll() {
    return this.locationRepository.find({ relations: ['favCharacters'] });
  }

  findOne(id: number) {
    return `This action returns a #${id} location`;
  }

  update(id: number, _updateLocationDto: UpdateLocationDto) {
    void _updateLocationDto;
    return `This action updates a #${id} location`;
  }

  remove(id: number) {
    return `This action removes a #${id} location`;
  }
}

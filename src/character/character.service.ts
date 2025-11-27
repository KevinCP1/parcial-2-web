import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Character } from './entities/character.entity';
import { Location } from '../location/entities/location.entity';

@Injectable()
export class CharacterService {
  constructor(
    @InjectRepository(Character)
    private readonly characterRepository: Repository<Character>,
    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,
  ) {}

  async create(createCharacterDto: CreateCharacterDto) {
    const ownershipId = createCharacterDto.ownershipId;
    const rest: Partial<Character> = {
      name: createCharacterDto.name,
      salary: createCharacterDto.salary,
      employee: createCharacterDto.employee,
    };

    const character = this.characterRepository.create(rest);

    if (ownershipId) {
      const location = await this.locationRepository.findOne({ where: { id: ownershipId } });
      if (!location) throw new NotFoundException('Location (ownership) not found');
      
      const existingOwner = await this.characterRepository.findOne({ where: { ownership: { id: ownershipId } } });
      if (existingOwner) throw new BadRequestException('Location is already owned by another character');

      character.ownership = location;
    }

    return this.characterRepository.save(character);
  }

  async addFavorite(id: number, locationId: number) {
    const character = await this.characterRepository.findOne({ where: { id }, relations: ['favPlaces'] });
    if (!character) throw new NotFoundException('Character not found');

    const location = await this.locationRepository.findOne({ where: { id: locationId } });
    if (!location) throw new NotFoundException('Location not found');

    const exists = character.favPlaces?.some((l) => l.id === locationId);
    if (!exists) {
      character.favPlaces = character.favPlaces ? [...character.favPlaces, location] : [location];
      await this.characterRepository.save(character);
    }

    return character;
  }

  async calculateTaxes(id: number) {
    const character = await this.characterRepository.findOne({ where: { id }, relations: ['ownership'] });
    if (!character) return { taxDebt: 0 };
    if (!character.ownership) return { taxDebt: 0 };

    const coef = character.employee ? 0.08 : 0.03;
    const cost = character.ownership.cost ?? 0;
    const taxDebt = cost * (1 + coef);
    return { taxDebt };
  }

  findAll() {
    return `This action returns all character`;
  }

  findOne(id: number) {
    return `This action returns a #${id} character`;
  }

  async update(id: number, updateCharacterDto: UpdateCharacterDto) {
    const character = await this.characterRepository.findOne({ where: { id }, relations: ['ownership', 'favPlaces'] });
    if (!character) throw new NotFoundException('Character not found');

    const { ownershipId, name, salary, employee } = updateCharacterDto;

    if (ownershipId !== undefined) {
      if (ownershipId === null) {
        (character).ownership = null;
      } else {
        const location = await this.locationRepository.findOne({ where: { id: ownershipId } });
        if (!location) throw new NotFoundException('Location (ownership) not found');

        const existingOwner = await this.characterRepository.findOne({ where: { ownership: { id: ownershipId } } });
        if (existingOwner && existingOwner.id !== id) throw new BadRequestException('Location is already owned by another character');

        character.ownership = location;
      }
    }

    if (name !== undefined) character.name = name;
    if (salary !== undefined) character.salary = salary;
    if (employee !== undefined) character.employee = employee;

    return this.characterRepository.save(character);
  }

  remove(id: number) {
    return `This action removes a #${id} character`;
  }
}

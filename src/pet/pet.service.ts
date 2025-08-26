import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pet } from './entities/pet.entity';
import { CreatePetInput } from './dto/create-pet.input';
import { Owner } from '../owner/entities/owner.entity';

@Injectable()
export class PetService {
  constructor(
    @InjectRepository(Pet)
    private petRepo: Repository<Pet>,
    @InjectRepository(Owner)
    private ownerRepo: Repository<Owner>,
  ) {}

  async create(data: CreatePetInput) {
    const pet = this.petRepo.create({
      name: data.name,
      species: data.species,
      age: data.age,
      description: data.description,
    });

    if (data.ownerId) {
      const owner = await this.ownerRepo.findOne({ where: { id: data.ownerId } });
      if (!owner) throw new NotFoundException('Owner not found');
      pet.owner = owner;
    }

    return this.petRepo.save(pet);
  }

  findAll() {
    return this.petRepo.find({ relations: ['owner'] });
  }

  findOne(id: number) {
    return this.petRepo.findOne({ where: { id }, relations: ['owner'] });
  }

  async update(id: number, partial: Partial<CreatePetInput>) {
    await this.petRepo.update(id, partial);
    const updated = await this.findOne(id);
    if (!updated) throw new NotFoundException('Pet not found');
    return updated;
  }

  async remove(id: number) {
    const res = await this.petRepo.delete(id);
    return res.affected && res.affected > 0;
  }
}

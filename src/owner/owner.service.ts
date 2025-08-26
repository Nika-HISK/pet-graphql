import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Owner } from './entities/owner.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOwnerInput } from './dto/create-owner.input';

@Injectable()
export class OwnerService {
  constructor(
    @InjectRepository(Owner)
    private ownerRepo: Repository<Owner>,
  ) {}

  create(data: CreateOwnerInput) {
    const owner = this.ownerRepo.create(data);
    return this.ownerRepo.save(owner);
  }

  findAll() {
    return this.ownerRepo.find({ relations: ['pets'] });
  }

  findOne(id: number) {
    return this.ownerRepo.findOne({ where: { id }, relations: ['pets'] });
  }

  async update(id: number, partial: Partial<CreateOwnerInput>) {
    await this.ownerRepo.update(id, partial);
    const updated = await this.findOne(id);
    if (!updated) throw new NotFoundException('Owner not found');
    return updated;
  }

  async remove(id: number) {
    const res = await this.ownerRepo.delete(id);
    return res.affected && res.affected > 0;
  }
}

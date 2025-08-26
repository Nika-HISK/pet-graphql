import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pet } from './entities/pet.entity';
import { Owner } from '../owner/entities/owner.entity';
import { PetService } from './pet.service';
import { PetResolver } from './pet.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Pet, Owner])],
  providers: [PetService, PetResolver],
  exports: [PetService],
})
export class PetModule {}

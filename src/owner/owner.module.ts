import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Owner } from './entities/owner.entity';
import { Pet } from '../pet/entities/pet.entity';
import { OwnerService } from './owner.service';
import { OwnerResolver } from './owner.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Owner, Pet])],
  providers: [OwnerService, OwnerResolver],
  exports: [OwnerService],
})
export class OwnerModule {}

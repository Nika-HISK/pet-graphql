import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Pet } from '../../pet/entities/pet.entity';

@ObjectType()
@Entity({ name: 'owners' })
export class Owner {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  email?: string;

  @Field(() => [Pet], { nullable: 'itemsAndList' })
  @OneToMany(() => Pet, (pet) => pet.owner)
  pets?: Pet[];
}

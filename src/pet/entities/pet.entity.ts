import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Owner } from '../../owner/entities/owner.entity';

@ObjectType()
@Entity({ name: 'pets' })
export class Pet {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  species: string;

  @Field(() => Int, { nullable: true })
  @Column({ nullable: true, type: 'int' })
  age?: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  description?: string;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => Owner, { nullable: true })
  @ManyToOne(() => Owner, (owner) => owner.pets, { nullable: true, onDelete: 'SET NULL', cascade: false })
  owner?: Owner;
}

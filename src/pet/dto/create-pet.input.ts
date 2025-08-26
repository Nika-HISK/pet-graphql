import { InputType, Field, Int } from '@nestjs/graphql';
import { IsOptional, IsString, IsInt } from 'class-validator';

@InputType()
export class CreatePetInput {
  @Field()
  @IsString()
  name: string;

  @Field()
  @IsString()
  species: string;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  age?: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  description?: string;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  ownerId?: number;
}

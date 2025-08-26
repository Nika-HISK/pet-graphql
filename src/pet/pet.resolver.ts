import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { Pet } from './entities/pet.entity';
import { PetService } from './pet.service';
import { CreatePetInput } from './dto/create-pet.input';

@Resolver(() => Pet)
export class PetResolver {
  constructor(private readonly petService: PetService) {}

  @Query(() => [Pet])
  pets() {
    return this.petService.findAll();
  }

  @Query(() => Pet, { nullable: true })
  pet(@Args('id', { type: () => Int }) id: number) {
    return this.petService.findOne(id);
  }

  @Mutation(() => Pet)
  createPet(@Args('data') data: CreatePetInput) {
    return this.petService.create(data);
  }

  @Mutation(() => Pet)
  updatePet(
    @Args('id', { type: () => Int }) id: number,
    @Args('data') data: CreatePetInput,
  ) {
    return this.petService.update(id, data);
  }

  @Mutation(() => Boolean)
  async deletePet(@Args('id', { type: () => Int }) id: number) {
    return this.petService.remove(id);
  }
}

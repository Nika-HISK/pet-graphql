import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { Owner } from './entities/owner.entity';
import { OwnerService } from './owner.service';
import { CreateOwnerInput } from './dto/create-owner.input';

@Resolver(() => Owner)
export class OwnerResolver {
  constructor(private readonly ownerService: OwnerService) {}

  @Query(() => [Owner])
  owners() {
    return this.ownerService.findAll();
  }

  @Query(() => Owner, { nullable: true })
  owner(@Args('id', { type: () => Int }) id: number) {
    return this.ownerService.findOne(id);
  }

  @Mutation(() => Owner)
  createOwner(@Args('data') data: CreateOwnerInput) {
    return this.ownerService.create(data);
  }

  @Mutation(() => Owner)
  updateOwner(
    @Args('id', { type: () => Int }) id: number,
    @Args('data') data: CreateOwnerInput,
  ) {
    return this.ownerService.update(id, data);
  }

  @Mutation(() => Boolean)
  async deleteOwner(@Args('id', { type: () => Int }) id: number) {
    return this.ownerService.remove(id);
  }
}

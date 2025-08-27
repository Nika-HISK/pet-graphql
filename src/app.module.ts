import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PetModule } from './pet/pet.module';
import { OwnerModule } from './owner/owner.module';
import { Pet } from './pet/entities/pet.entity';
import { Owner } from './owner/entities/owner.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (cs: ConfigService) => ({
        type: 'postgres',
        host: cs.get('POSTGRES_HOST', 'localhost'),
        port: parseInt(cs.get('POSTGRES_PORT', '5432'), 10),
        username: cs.get('POSTGRES_USER', 'dev'),
        password: cs.get('POSTGRES_PASSWORD', 'devpass'),
        database: cs.get('POSTGRES_DB', 'petdb'),
        entities: [Pet, Owner],
        synchronize: true,
        logging: true,
      }),
      inject: [ConfigService],
    }),
    PetModule,
    OwnerModule,
  ],
})
export class AppModule {}

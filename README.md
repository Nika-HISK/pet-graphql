# GraphQL API

A comprehensive GraphQL API built with NestJS and TypeORM for managing pets and their owners. This project demonstrates GraphQL fundamentals, database relationships, and modern backend development practices.

## Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [GraphQL Fundamentals](#graphql-fundamentals)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Database Setup](#database-setup)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [GraphQL Operations](#graphql-operations)
- [Database Schema](#database-schema)
- [Project Structure](#project-structure)
- [Development](#development)
- [Testing](#testing)
- [Deployment](#deployment)

## Overview

This Pet GraphQL API allows you to manage pets and their owners through a GraphQL interface. The API supports full CRUD operations for both pets and owners, demonstrating key GraphQL concepts including queries, mutations, relationships, and schema design.

### Key Features

- GraphQL API with Apollo Server
- TypeORM with PostgreSQL database
- One-to-many relationship between owners and pets
- Input validation with class-validator
- Auto-generated GraphQL schema
- Development tools (ESLint, Prettier)
- Comprehensive test setup

## Architecture

The application follows a modular architecture with clear separation of concerns:

```
├── Presentation Layer (GraphQL Resolvers)
├── Business Logic Layer (Services)
├── Data Access Layer (TypeORM Entities & Repositories)
└── Database Layer (PostgreSQL)
```

### Technology Stack

- **Framework**: NestJS
- **GraphQL**: Apollo Server with @nestjs/graphql
- **Database**: PostgreSQL with TypeORM
- **Validation**: class-validator and class-transformer
- **Testing**: Jest
- **Code Quality**: ESLint and Prettier

## GraphQL Fundamentals

### What is GraphQL?

GraphQL is a query language and runtime for APIs that allows clients to request exactly the data they need. Unlike REST APIs that have multiple endpoints, GraphQL has a single endpoint that can handle various data requirements.

### Key GraphQL Concepts

#### 1. Schema
The GraphQL schema defines the structure of your API, including types, queries, mutations, and relationships.

```graphql
type Pet {
  id: Int!
  name: String!
  species: String!
  age: Int
  description: String
  createdAt: DateTime!
  owner: Owner
}

type Owner {
  id: Int!
  name: String!
  email: String
  pets: [Pet]
}
```

#### 2. Queries
Queries are read operations that fetch data from the server.

```graphql
query GetAllPets {
  pets {
    id
    name
    species
    owner {
      name
    }
  }
}
```

#### 3. Mutations
Mutations are write operations that modify data on the server.

```graphql
mutation CreatePet {
  createPet(data: {
    name: "Buddy"
    species: "Dog"
    age: 3
    ownerId: 1
  }) {
    id
    name
    species
  }
}
```

#### 4. Types
GraphQL uses a strong type system to define the structure of data.

- **Scalar Types**: Int, String, Boolean, Float, ID
- **Object Types**: Custom types like Pet and Owner
- **Input Types**: Used for mutations and complex arguments
- **Enums**: Predefined set of values

## Prerequisites

- Node.js (version 16 or higher)
- npm or yarn
- PostgreSQL database
- Basic understanding of TypeScript and JavaScript

## Installation

1. Clone the repository:
```bash
git clone https://github.com/Nika-HISK/pet-graphql.git
cd pet-graphql
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=dev
POSTGRES_PASSWORD=devpass
POSTGRES_DB=petdb
PORT=3000
```

## Database Setup

### Option 1: Using Docker
```bash
docker run --name pet-postgres \
  -e POSTGRES_USER=dev \
  -e POSTGRES_PASSWORD=devpass \
  -e POSTGRES_DB=petdb \
  -p 5432:5432 \
  -d postgres:13
```

### Option 2: Local PostgreSQL Installation
1. Install PostgreSQL on your system
2. Create a database named `petdb`
3. Create a user with credentials matching your `.env` file
4. Grant necessary permissions

The application uses TypeORM's `synchronize: true` option, which automatically creates database tables based on entity definitions during development.

## Running the Application

### Development Mode
```bash
npm run start:dev
```

### Production Mode
```bash
npm run build
npm run start:prod
```

### Debug Mode
```bash
npm run start:debug
```

The server will start on `http://localhost:3000` with GraphQL playground available at `http://localhost:3000/graphql`.

## API Documentation

### GraphQL Playground

Access the interactive GraphQL playground at `http://localhost:3000/graphql` where you can:

- Explore the schema
- Write and test queries and mutations
- View documentation for all available operations
- Use autocomplete and syntax highlighting

### Schema Overview

The API exposes the following main types:

#### Pet Type
```graphql
type Pet {
  id: Int!                    # Unique identifier
  name: String!              # Pet's name
  species: String!           # Pet's species (dog, cat, etc.)
  age: Int                   # Pet's age (optional)
  description: String        # Pet description (optional)
  createdAt: DateTime!       # Creation timestamp
  owner: Owner              # Associated owner (optional)
}
```

#### Owner Type
```graphql
type Owner {
  id: Int!                   # Unique identifier
  name: String!             # Owner's name
  email: String             # Owner's email (optional)
  pets: [Pet]               # List of owned pets
}
```

## GraphQL Operations

### Queries

#### Get All Pets
```graphql
query GetAllPets {
  pets {
    id
    name
    species
    age
    description
    createdAt
    owner {
      id
      name
      email
    }
  }
}
```

#### Get Single Pet
```graphql
query GetPet($id: Int!) {
  pet(id: $id) {
    id
    name
    species
    age
    description
    owner {
      name
      email
    }
  }
}
```

#### Get All Owners
```graphql
query GetAllOwners {
  owners {
    id
    name
    email
    pets {
      id
      name
      species
    }
  }
}
```

#### Get Single Owner
```graphql
query GetOwner($id: Int!) {
  owner(id: $id) {
    id
    name
    email
    pets {
      id
      name
      species
      age
    }
  }
}
```

### Mutations

#### Create Pet
```graphql
mutation CreatePet($data: CreatePetInput!) {
  createPet(data: $data) {
    id
    name
    species
    age
    description
    owner {
      id
      name
    }
  }
}
```

Variables:
```json
{
  "data": {
    "name": "Buddy",
    "species": "Dog",
    "age": 3,
    "description": "Friendly golden retriever",
    "ownerId": 1
  }
}
```

#### Create Owner
```graphql
mutation CreateOwner($data: CreateOwnerInput!) {
  createOwner(data: $data) {
    id
    name
    email
  }
}
```

Variables:
```json
{
  "data": {
    "name": "John Doe",
    "email": "john.doe@example.com"
  }
}
```

#### Update Pet
```graphql
mutation UpdatePet($id: Int!, $data: CreatePetInput!) {
  updatePet(id: $id, data: $data) {
    id
    name
    species
    age
    description
  }
}
```

#### Update Owner
```graphql
mutation UpdateOwner($id: Int!, $data: CreateOwnerInput!) {
  updateOwner(id: $id, data: $data) {
    id
    name
    email
  }
}
```

#### Delete Pet
```graphql
mutation DeletePet($id: Int!) {
  deletePet(id: $id)
}
```

#### Delete Owner
```graphql
mutation DeleteOwner($id: Int!) {
  deleteOwner(id: $id)
}
```

### Advanced Query Examples

#### Nested Relationships
```graphql
query ComplexQuery {
  owners {
    id
    name
    pets {
      id
      name
      species
      age
    }
  }
}
```

#### Selective Fields
```graphql
query MinimalPetInfo {
  pets {
    name
    species
  }
}
```

#### Variables Usage
```graphql
query GetPetsByOwner($ownerId: Int!) {
  owner(id: $ownerId) {
    name
    pets {
      name
      species
      age
    }
  }
}
```

## Database Schema

### Entity Relationships

The database consists of two main entities with a one-to-many relationship:

```
Owner (1) ←→ (Many) Pet
```

### Table Structures

#### Owners Table
```sql
CREATE TABLE owners (
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    email VARCHAR NULL
);
```

#### Pets Table
```sql
CREATE TABLE pets (
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    species VARCHAR NOT NULL,
    age INTEGER NULL,
    description TEXT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ownerId INTEGER REFERENCES owners(id) ON DELETE SET NULL
);
```

### Relationship Configuration

- **Owner to Pet**: One-to-Many (`@OneToMany`)
- **Pet to Owner**: Many-to-One (`@ManyToOne`)
- **Cascade**: Disabled to prevent accidental deletions
- **On Delete**: SET NULL for pet's owner reference

## Project Structure

```
src/
├── owner/
│   ├── dto/
│   │   ├── create-owner.input.ts     # GraphQL input type for creating owners
│   │   └── update-owner.input.ts     # GraphQL input type for updating owners
│   ├── entities/
│   │   └── owner.entity.ts           # TypeORM entity definition
│   ├── owner.module.ts               # NestJS module configuration
│   ├── owner.resolver.ts             # GraphQL resolver
│   ├── owner.service.ts              # Business logic service
│   └── *.spec.ts                     # Test files
├── pet/
│   ├── dto/
│   │   ├── create-pet.input.ts       # GraphQL input type for creating pets
│   │   └── update-pet.input.ts       # GraphQL input type for updating pets
│   ├── entities/
│   │   └── pet.entity.ts             # TypeORM entity definition
│   ├── pet.module.ts                 # NestJS module configuration
│   ├── pet.resolver.ts               # GraphQL resolver
│   ├── pet.service.ts                # Business logic service
│   └── *.spec.ts                     # Test files
├── app.controller.ts                 # REST controller (if needed)
├── app.module.ts                     # Root application module
├── app.service.ts                    # Application service
├── main.ts                           # Application bootstrap
└── schema.gql                        # Auto-generated GraphQL schema
```

### File Explanations

#### Resolvers (`*.resolver.ts`)
Resolvers are responsible for handling GraphQL operations. They contain methods decorated with `@Query()` and `@Mutation()` that correspond to GraphQL operations.

#### Services (`*.service.ts`)
Services contain business logic and interact with the database through TypeORM repositories. They are injected into resolvers.

#### Entities (`entities/*.entity.ts`)
Entities define the database table structure and GraphQL object types. They use decorators from both TypeORM and GraphQL.

#### DTOs (`dto/*.input.ts`)
Data Transfer Objects define the structure of input data for mutations. They include validation rules using class-validator.

## Development

### Code Formatting
```bash
npm run format
```

### Linting
```bash
npm run lint
```

### Watch Mode
```bash
npm run start:dev
```

### Database Schema Changes

When you modify entities:
1. The schema will auto-update in development mode due to `synchronize: true`
2. For production, use TypeORM migrations:
```bash
npm run typeorm migration:generate -- -n MigrationName
npm run typeorm migration:run
```

### Adding New Features

#### Adding a New Field to Pet Entity

1. Update the entity:
```typescript
// src/pet/entities/pet.entity.ts
@Field()
@Column({ nullable: true })
breed?: string;
```

2. Update the input DTO:
```typescript
// src/pet/dto/create-pet.input.ts
@Field({ nullable: true })
@IsOptional()
@IsString()
breed?: string;
```

3. The GraphQL schema will auto-update

#### Adding New Relationships

1. Define the relationship in entities
2. Update services to handle the relationship
3. Create appropriate resolvers
4. Update input DTOs if needed

## Testing

### Running Tests

#### Unit Tests
```bash
npm run test
```

#### Watch Mode
```bash
npm run test:watch
```

#### Coverage Report
```bash
npm run test:cov
```

#### End-to-End Tests
```bash
npm run test:e2e
```

### Test Structure

Tests are located alongside their corresponding source files with `.spec.ts` extension. The project uses Jest testing framework.

Example test structure:
```typescript
describe('PetService', () => {
  let service: PetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PetService],
    }).compile();

    service = module.get<PetService>(PetService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
```

## Deployment

### Environment Variables

Create appropriate `.env` files for different environments:

#### Production (.env.production)
```env
POSTGRES_HOST=your-production-host
POSTGRES_PORT=5432
POSTGRES_USER=production-user
POSTGRES_PASSWORD=secure-password
POSTGRES_DB=pet_production
PORT=3000
NODE_ENV=production
```

### Build Process

```bash
npm run build
```

### Production Deployment

1. **Docker Deployment**:
```dockerfile
FROM node:16-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY dist ./dist
COPY .env.production ./.env

EXPOSE 3000
CMD ["npm", "run", "start:prod"]
```

2. **Traditional Deployment**:
- Build the application
- Set up PostgreSQL database
- Configure environment variables
- Start the application with PM2 or similar process manager

### Database Migrations

For production deployments, disable `synchronize` and use migrations:

```typescript
// app.module.ts
TypeOrmModule.forRootAsync({
  useFactory: (cs: ConfigService) => ({
    // ... other config
    synchronize: false, // Disable for production
    migrations: ['dist/migrations/*.js'],
    migrationsRun: true,
  }),
}),
```

## Learning GraphQL with This Project

### Getting Started with GraphQL

1. **Start the server** and visit the GraphQL playground
2. **Explore the schema** using the documentation panel
3. **Try simple queries** to fetch data
4. **Experiment with mutations** to modify data
5. **Practice relationships** by querying nested data

### Learning Path

1. **Basic Queries**: Start with simple pet and owner queries
2. **Query Variables**: Learn to use variables in queries
3. **Mutations**: Practice creating, updating, and deleting data
4. **Relationships**: Explore how to fetch related data in a single query
5. **Advanced Concepts**: Fragments, aliases, and directives

### Common GraphQL Patterns

#### Fragment Usage
```graphql
fragment PetInfo on Pet {
  id
  name
  species
  age
}

query GetPets {
  pets {
    ...PetInfo
    owner {
      name
    }
  }
}
```

#### Aliases
```graphql
query GetMultiplePets {
  firstPet: pet(id: 1) {
    name
    species
  }
  secondPet: pet(id: 2) {
    name
    species
  }
}
```

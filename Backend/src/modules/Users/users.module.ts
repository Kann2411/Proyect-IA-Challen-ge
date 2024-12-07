import { Module } from '@nestjs/common';
import { UserController } from './users.controller';
import { UserServices } from './users.service';
import { UserRepository } from './users.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserServices, UserRepository],
  exports: [],
})
export class UsersModule {}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from 'src/Dtos/createUser.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User) private readonly userDBRepository: Repository<User>,
  ) {}
  async findUserByEmail(email) {
    const user = await this.userDBRepository.findOneBy({ email });
    return user;
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    try {
      const newUser = this.userDBRepository.create(createUserDto);

      if (createUserDto.password) {
        newUser.password = await bcrypt.hash(createUserDto.password, 10);
      }

      await this.userDBRepository.save(newUser);
      return newUser;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new HttpException('Error creating user', HttpStatus.BAD_REQUEST);
    }
  }
}

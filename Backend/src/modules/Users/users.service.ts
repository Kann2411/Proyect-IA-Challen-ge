import { Injectable } from '@nestjs/common';
import { UserRepository } from './users.repository';

@Injectable()
export class UserServices {
  constructor(private readonly userRespository: UserRepository) {}

  getUsers() {
    return this.userRespository.getAllUsers();
  }

  getUserById(id: string) {
    return this.userRespository.getUserById(id);
  }
}

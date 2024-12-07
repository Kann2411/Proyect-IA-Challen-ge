import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthRepository {
  constructor() {}

  async loginUser(email, password) {
    console.log(email);
    console.log(password);
  }
}

import { Injectable } from '@nestjs/common';
import { AuthRepository } from './auth.repository';

@Injectable()
export class AuthService {
  constructor(private readonly authRespository: AuthRepository) {}

  loginUser(loginDto) {
    const { email, password } = loginDto;
    return this.authRespository.loginUser(email, password);
  }
}

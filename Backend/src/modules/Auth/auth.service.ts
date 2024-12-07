import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { UserRepository } from '../users/users.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/Dtos/createUser.dto';
import { User } from '../users/users.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRespository: AuthRepository,
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(loginDto) {
    const { email, password } = loginDto;
    if (!email || !password) {
      throw new BadRequestException('Email and password required');
    }
    const user = await this.userRepository.findUserByEmail(email);
    if (!user) {
      throw new BadRequestException('User not found');
    }
    if (user.isBanned) {
      throw new BadRequestException('Your account has been baned');
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      throw new BadRequestException('Invalid Credentials');
    }
    const payload = {
      id: user.id,
      email: user.email,
      roles: user.role,
    };

    const token = this.jwtService.sign(payload);
    return {
      message: 'Login succesfull',
      token,
    };
  }

  async signUp(userDto: CreateUserDto): Promise<Omit<User, 'role'>> {
    const { email, password } = userDto;

    const findUser = await this.userRepository.findUserByEmail(email);
    if (findUser) {
      throw new ConflictException('Email already exists');
    }

    const newUserDtop = {
      ...userDto,
      password,
    };

    const newUser = await this.userRepository.createUser(newUserDtop);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { role, ...userWithoutRole } = newUser;

    return userWithoutRole;
  }
}

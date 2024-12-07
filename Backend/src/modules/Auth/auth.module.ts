import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthRepository } from './auth.repository';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [AuthService, AuthRepository],
  exports: [],
})
export class AuthModule {}

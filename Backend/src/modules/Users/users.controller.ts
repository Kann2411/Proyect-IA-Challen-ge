import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { UserServices } from './users.service';

@Controller('users')
export class UserController {
  constructor(private readonly UserServices: UserServices) {}

  @Get()
  getUsers() {
    return this.UserServices.getUsers();
  }

  @Get(':id')
  getUserById(@Param(':id', ParseUUIDPipe) id: string) {
    return this.UserServices.getUserById(id);
  }
}

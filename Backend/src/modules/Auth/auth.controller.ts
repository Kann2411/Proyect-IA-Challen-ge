import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from 'src/Dtos/LoginDto';
import { CreateUserDto } from 'src/Dtos/createUser.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('google/callback')
  async googleLoginCallback(@Req() req, @Res() res) {
    const tokenData = await this.authService.validateOAuthLogin(req.user);
    console.log(
      'Redirecting to: ',
      `https://localhost:3000/boton-prueba?token=${tokenData.token}`,
    );
    return res.redirect(
      `https://localhost:3000/boton-prueba?token=${tokenData.token}`,
    );
  }
  @Post('signin')
  signIn(@Body() loginDto: LoginDto) {
    return this.authService.signIn(loginDto);
  }

  @Post('signup')
  signUp(@Body() userDto: CreateUserDto) {
    return this.authService.signUp(userDto);
  }
}

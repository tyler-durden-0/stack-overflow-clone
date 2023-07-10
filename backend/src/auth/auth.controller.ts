import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { registerUserDto } from './dto/register.dto';
import { signInDto } from './dto/signIn.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('register')
  register(@Body() payload: registerUserDto) {
    return this.authService.registerUser(payload);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signIn(@Body() payload: signInDto) {
    return this.authService.signIn(payload);
  }
}

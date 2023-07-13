import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { registerUserDto } from './dto/register.dto';
import { logInDto } from './dto/logIn.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() payload: registerUserDto) {
    return this.authService.registerUser(payload);
  }

  @Post('login')
  signIn(@Body() payload: logInDto) {
    return this.authService.logIn(payload);
  }
}

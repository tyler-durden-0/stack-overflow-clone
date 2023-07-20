import {
  Body,
  Controller,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { registerUserDto } from './dto/register.dto';
import { logInDto, logOutDto, refreshDto } from './dto';

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

  @Post('logout')
  logOut(@Body() payload: logOutDto) {
    const userId = payload.userId;
    return this.authService.logOut(userId);
  }

  @Post('refresh')
  refresh(@Body() payload: refreshDto) {
    return this.authService.refresh(payload);
  }
}

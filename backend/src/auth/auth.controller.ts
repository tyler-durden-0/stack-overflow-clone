import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { registerUserDto } from './dto/register.dto';
import { logInDto, refreshDto } from './dto';
import { AuthGuard } from './guard';

@ApiTags('Auth')
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
  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiUnauthorizedResponse({ description: 'Unauthorized, please login' })
  logOut(@Req() req: any) {
    const userId: number = req.user.userId;
    return this.authService.logOut(userId);
  }

  @Post('refresh')
  refresh(@Body() payload: refreshDto) {
    return this.authService.refresh(payload);
  }
}

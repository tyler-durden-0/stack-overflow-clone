import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { Roles } from 'src/auth/roles/roles.decorator';
import { Role } from 'src/auth/roles/roles.enum';
import { RolesGuard } from 'src/auth/roles/roles.guard';
import { AuthGuard } from 'src/auth/guard/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post()
  @Roles(Role.user)
  @UseGuards(AuthGuard, RolesGuard)
  test() {
    return 'test';
  }
}

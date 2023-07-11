import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { UsersController } from './users.controller';
import { RolesGuard } from 'src/auth/roles';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService, JwtService, RolesGuard, AuthGuard],
  exports: [UsersService, TypeOrmModule],
})
export class UsersModule {}

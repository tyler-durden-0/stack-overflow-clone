import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { registerUserDto } from './dto/register.dto';
import { User } from 'src/users/entity/user.entity';
import * as bcrypt from 'bcrypt';
import { logInDto } from './dto/logIn.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async registerUser(
    payload: registerUserDto,
  ): Promise<User | BadRequestException> {
    const userByEmail: User | null = await this.usersService.findOneByEmail(
      payload.email,
    );
    if (!userByEmail) {
      const hashPassword: string = await bcrypt.hash(payload.password, 5);
      return await this.usersService.createUser({
        ...payload,
        password: hashPassword,
      });
    }
    throw new BadRequestException();
  }

  async logIn(payload: logInDto): Promise<object | BadRequestException> {
    const user: User | null = await this.usersService.findOneByEmail(
      payload.email,
    );
    if (await this.isPasswordValid(payload.password, user.password)) {
      const jwtPayload = { userId: user.id };
      return {
        access_token: await this.jwtService.signAsync(jwtPayload),
      };
    }
    throw new BadRequestException();
  }

  async isPasswordValid(
    candidatePassword: string,
    passwordFromDb: string,
  ): Promise<boolean> {
    const passwordEquals = await bcrypt.compare(
      candidatePassword,
      passwordFromDb,
    );
    return passwordEquals;
  }
}

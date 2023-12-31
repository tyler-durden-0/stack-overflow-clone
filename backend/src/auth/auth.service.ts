import { BadRequestException, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { logInDto, refreshDto, registerUserDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
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
    if (user && await this.isPasswordValid(payload.password, user.password)) {
      const jwtPayload = { userId: user.id };

      const access_token = await this.jwtService.signAsync(jwtPayload);
      const refresh_token = await this.jwtService.signAsync(jwtPayload, {expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRES')});
      
      await this.cacheManager.set(`access_token:${user.id}`, access_token);
      await this.cacheManager.set(`refresh_token:${user.id}`, refresh_token);

      return {
        access_token,
        refresh_token,
      };
    }
    throw new BadRequestException();
  }

  async logOut(userId: number): Promise<void | BadRequestException> {
    const user: User | undefined = await this.usersService.findOneById(userId);

    if (user) {
      await this.cacheManager.del(`access_token:${userId}`)
      await this.cacheManager.del(`refresh_token:${userId}`)
    } else {
      throw new BadRequestException;
    }

  }

  async refresh(payload: refreshDto): Promise<object | BadRequestException | HttpException> {
    try {
      const decodedToken = await this.jwtService.verifyAsync(payload.refresh_token, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });
      if (typeof decodedToken === 'object') {
        if (await this.cacheManager.get(`refresh_token:${decodedToken.userId}`) === payload.refresh_token) {
          //delete old token
          await this.cacheManager.del(`refresh_token:${decodedToken.userId}`);
  
          //generate new access and refresh tokens
          const jwtPayload = {userId: decodedToken.userId};
  
          const access_token = await this.jwtService.signAsync(jwtPayload);
          const refresh_token = await this.jwtService.signAsync(jwtPayload, {expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRES')});
      
          //save in Redis
          await this.cacheManager.set(`access_token:${decodedToken.userId}`, access_token);
          await this.cacheManager.set(`refresh_token:${decodedToken.userId}`, refresh_token);
  
          return {
            access_token,
            refresh_token,
          };
        } else {
          throw new HttpException('Redirect to the /login', HttpStatus.FOUND, {description: 'Redirect to the /login'})
        }
      }
    } catch(e) {
      if (e.status === 302) {
        throw new HttpException('Redirect to the /login', HttpStatus.FOUND, {description: 'Redirect to the /login'})
      } else {
        throw new BadRequestException;
      }
    }
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

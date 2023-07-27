import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';
import { Role } from '../roles/roles.enum';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private jwtService: JwtService,
    private configService: ConfigService,
    private usersService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });
      if (!await this.isUserLogOut(payload.userId)) {
        const userRole: string = (await this.isAdmin(payload.userId)) ? Role.admin : Role.user;
        request['user'] = { ...payload, roles: userRole };
      } else {
        throw new UnauthorizedException();
      }
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  private async isAdmin(userId: number) {
    const user: User | null = await this.usersService.findOneById(userId);
    return user?.isAdmin;
  }

  private async isUserLogOut(userId: number): Promise<boolean> {
    try {
      const access_token = await this.cacheManager.get(`access_token:${userId}`);
      const refresh_token = await this.cacheManager.get(`refresh_token:${userId}`);
      return access_token && refresh_token ? false : true;
    } catch {
      return true;
    }
  }
}

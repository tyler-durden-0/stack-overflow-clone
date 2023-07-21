import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { dataSourceOptions } from '../db/data-source';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-store';
import { QuestionService } from './question/question.service';
import { QuestionController } from './question/question.controller';
import { QuestionModule } from './question/question.module';
import { AnswerModule } from './answer/answer.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(dataSourceOptions),
    CacheModule.register({
      isGlobal: true,
      // @ts-ignore
      store: async () => await redisStore({
        // Store-specific configuration:
        socket: {
          // host: 'redis-stack',
          port: 6379,
        }
      })
    }),
    AuthModule,
    UsersModule,
    QuestionModule,
    AnswerModule,
    JwtModule,
  ],
  controllers: [AppController, QuestionController],
  providers: [AppService, QuestionService],
})
export class AppModule {}

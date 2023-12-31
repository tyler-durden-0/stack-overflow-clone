import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { dataSourceOptions } from '../db/data-source';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-store';
import { QuestionModule } from './question/question.module';
import { AnswerModule } from './answer/answer.module';
import { JwtModule } from '@nestjs/jwt';
import { TagModule } from './tag/tag.module';
import { LikeQuestionModule } from './like-question/like-question.module';
import { LikeAnswerModule } from './like-answer/like-answer.module';
import { DislikeAnswerModule } from './dislike-answer/dislike-answer.module';
import { DislikeQuestionModule } from './dislike-question/dislike-question.module';

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
          host: 'redis-stack',
          port: 6379,
        }
      })
    }),
    AuthModule,
    UsersModule,
    QuestionModule,
    AnswerModule,
    JwtModule,
    TagModule,
    LikeQuestionModule,
    LikeAnswerModule,
    DislikeAnswerModule,
    DislikeQuestionModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

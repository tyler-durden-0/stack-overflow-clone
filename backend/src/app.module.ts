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
import { TagModule } from './tag/tag.module';
import { LikeQuestionModule } from './like-question/like-question.module';
import { LikeAnswerModule } from './like-answer/like-answer.module';

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
    TagModule,
    LikeQuestionModule,
    LikeAnswerModule,
  ],
  controllers: [AppController, QuestionController],
  providers: [AppService, QuestionService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { AnswerController } from './answer.controller';
import { UsersModule } from 'src/users/users.module';
import { Answer } from './entities/answer.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionModule } from 'src/question/question.module';
import { JwtService } from '@nestjs/jwt';
import { LikeAnswerModule } from 'src/like-answer/like-answer.module';

@Module({
  imports: [TypeOrmModule.forFeature([Answer]), UsersModule, QuestionModule, LikeAnswerModule],
  providers: [AnswerService, JwtService],
  controllers: [AnswerController]
})
export class AnswerModule {}

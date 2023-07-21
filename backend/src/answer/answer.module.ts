import { Module } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { AnswerController } from './answer.controller';
import { UsersModule } from 'src/users/users.module';
import { Answer } from './entity/answer.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionModule } from 'src/question/question.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Answer]), UsersModule, QuestionModule],
  providers: [AnswerService, JwtService],
  controllers: [AnswerController]
})
export class AnswerModule {}

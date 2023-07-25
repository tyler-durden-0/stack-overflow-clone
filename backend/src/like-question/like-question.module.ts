import { Module } from '@nestjs/common';
import { LikeQuestionService } from './like-question.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LikeQuestion } from './entities/like-question.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LikeQuestion])],
  providers: [LikeQuestionService],
  exports: [LikeQuestionService]
})
export class LikeQuestionModule {}

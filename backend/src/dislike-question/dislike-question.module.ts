import { Module } from '@nestjs/common';
import { DislikeQuestionService } from './dislike-question.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DislikeQuestion } from './entities/dislike-question.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DislikeQuestion])],
  providers: [DislikeQuestionService],
  exports: [DislikeQuestionService]
})
export class DislikeQuestionModule {}

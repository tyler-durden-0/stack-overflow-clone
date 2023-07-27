import { Module } from '@nestjs/common';
import { DislikeAnswerService } from './dislike-answer.service';
import { DislikeAnswer } from './entities/dislike-answer.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([DislikeAnswer])],
  providers: [DislikeAnswerService],
  exports: [DislikeAnswerService]
})
export class DislikeAnswerModule {}

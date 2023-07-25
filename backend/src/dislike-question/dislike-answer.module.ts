import { Module } from '@nestjs/common';
import { LikeAnswerService } from './dislike-answer.service';
import { LikeAnswer } from './entities/dislike-answer.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([LikeAnswer])],
  providers: [LikeAnswerService],
  exports: [LikeAnswerService]
})
export class LikeAnswerModule {}

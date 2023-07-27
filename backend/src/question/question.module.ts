import { Module } from '@nestjs/common';
import { Question } from './entities/question.entity';
import { QuestionController } from './question.controller';
import { QuestionService } from './question.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { JwtService } from '@nestjs/jwt';
import { TagModule } from 'src/tag/tag.module';
import { LikeQuestionModule } from 'src/like-question/like-question.module';
import { DislikeQuestionModule } from 'src/dislike-question/dislike-question.module';

@Module({
    imports: [TypeOrmModule.forFeature([Question]), UsersModule, TagModule, LikeQuestionModule, DislikeQuestionModule],
    controllers: [QuestionController],
    providers: [QuestionService, JwtService],
    exports: [TypeOrmModule, QuestionService]
})
export class QuestionModule {}
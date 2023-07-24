import { Module } from '@nestjs/common';
import { Question } from './entities/question.entity';
import { QuestionController } from './question.controller';
import { QuestionService } from './question.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { JwtService } from '@nestjs/jwt';
import { TagModule } from 'src/tag/tag.module';

@Module({
    imports: [TypeOrmModule.forFeature([Question]), UsersModule, TagModule],
    controllers: [QuestionController],
    providers: [QuestionService, JwtService],
    exports: [TypeOrmModule, QuestionService]
})
export class QuestionModule {}
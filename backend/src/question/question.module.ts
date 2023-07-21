import { Module } from '@nestjs/common';
import { Question } from './entity/question.entity';
import { QuestionController } from './question.controller';
import { QuestionService } from './question.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { JwtService } from '@nestjs/jwt';

@Module({
    imports: [TypeOrmModule.forFeature([Question]), UsersModule],
    controllers: [QuestionController],
    providers: [QuestionService, JwtService],
    exports: [TypeOrmModule, QuestionService]
})
export class QuestionModule {}
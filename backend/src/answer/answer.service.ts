import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { Answer } from './entity/answer.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { createAnswerDto } from './dto';
import { User } from 'src/users/entity/user.entity';
import { QuestionService } from 'src/question/question.service';
import { Question } from 'src/question/entity/question.entity';

@Injectable()
export class AnswerService {
    constructor(
        @InjectRepository(Answer) private answerRepository: Repository<Answer>,
        private usersService: UsersService,
        private questionService: QuestionService) {}

    async createAnswer(payload: Partial<createAnswerDto> & {userId: number}): Promise<Answer> {
        try {
            const userEntity: User = await this.usersService.findOneById(payload.userId);
            const questionEntity: Question = await this.questionService.getQuestionById(payload.questionId);

            console.log('userEntity', userEntity)
            console.log('questionEntity', questionEntity)
    
            if (userEntity && questionEntity) {
                const createdAnswer: Answer = this.answerRepository.create({author: userEntity.email, text: payload.text})

                createdAnswer.user = userEntity;
                createdAnswer.question = questionEntity;

                return await this.answerRepository.save(createdAnswer);
            } else {
                throw new Error;
            }
        } catch {
            throw new Error;
        }
    }
}

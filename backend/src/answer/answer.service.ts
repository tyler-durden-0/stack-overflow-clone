import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { Answer } from './entity/answer.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { createAnswerDto, updateAnswerDto } from './dto';
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
    
            if (userEntity && questionEntity) {
                const createdAnswer: Answer = this.answerRepository.create({author: userEntity.email, text: payload.text})

                createdAnswer.user = userEntity;
                createdAnswer.question = questionEntity;

                return this.answerRepository.save(createdAnswer);
            } else {
                throw new Error;
            }
        } catch {
            throw new Error;
        }
    }

    async getUsersAnswerById(answerId: number): Promise<Answer> {
        return this.answerRepository.findOne({relations: {user: true}, where: {id: answerId}});
    }

    async updateAnswer(payload: Partial<updateAnswerDto> & {userId: number} & {answerId: number}): Promise<boolean> {
        try {
            const userEntity: User = await this.usersService.findOneById(payload.userId);
            const questionEntity: Question = await this.questionService.getQuestionById(payload.questionId);
    
            if (userEntity && questionEntity) {
                const updattedAnswer: UpdateResult = await this.answerRepository.update(payload.answerId, {text: payload?.text, dateOfUpdate: new Date()});
                return updattedAnswer.affected > 0;
            } else {
                throw new Error;
            }
        } catch {
            throw new Error;
        }
    }

    async deleteAnswerById(answerId: number): Promise<boolean> {
        try {
            const deleteResult: DeleteResult = await this.answerRepository.delete({id: answerId});
            return deleteResult.affected > 0;
        } catch(err) {
            throw err;
        }
    }
}

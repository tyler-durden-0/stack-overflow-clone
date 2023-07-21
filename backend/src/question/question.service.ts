import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from './entity/question.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { createQuestionDto, updateQuestionDto } from './dto';
import { User } from 'src/users/entity/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class QuestionService {
    constructor(
        @InjectRepository(Question) private questionRepository: Repository<Question>, private usersService: UsersService,) {}

    async createQuestion(payload: Partial<createQuestionDto> & {userId: number}): Promise<Question | BadRequestException> {
        try {
            const userEntity: User = await this.usersService.findOneById(payload.userId);

            const newQuestionEntity: Question = this.questionRepository.create({ ...payload })

            newQuestionEntity.user = userEntity;

            await this.questionRepository.save(newQuestionEntity);

            return newQuestionEntity;
        } catch {
            throw new BadRequestException();
        }

    }

    async getQuestions(): Promise<Question[] | BadRequestException> {
        return await this.questionRepository.find();
    }

    async getQuestionById(id: number): Promise<Question> {
        return await this.questionRepository.findOneBy({id});
    }

    async getUsersQuestionById(id: number): Promise<Question> {
        return await this.questionRepository.findOne({relations: {user: true}, where: {id}});
    }

    async updateQuestionById(payload: Partial<updateQuestionDto> & {questionId: number}): Promise<boolean> {
        try {
            const updatedQuesion: UpdateResult = await this.questionRepository.update(payload.questionId, {title: payload?.title, desription: payload?.description, tags: payload?.tags, dateOfUpdate: new Date()});
            return updatedQuesion.affected > 0;
        } catch(err) {
            throw err;
        }
    }

    async deleteQuestionById(id: number): Promise<boolean> {
        try {
            const deleteResult: DeleteResult = await this.questionRepository.delete({id});
            return deleteResult.affected > 0;
        } catch(err) {
            throw err;
        }
    }
}

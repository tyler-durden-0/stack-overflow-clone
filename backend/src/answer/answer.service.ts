import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { Answer } from './entities/answer.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { createAnswerDto, updateAnswerDto } from './dto';
import { User } from 'src/users/entities/user.entity';
import { QuestionService } from 'src/question/question.service';
import { Question } from 'src/question/entities/question.entity';
import { LikeAnswerService } from 'src/like-answer/like-answer.service';
import { LikeAnswer } from 'src/like-answer/entities/like-answer.entity';
import { DislikeAnswerService } from 'src/dislike-answer/dislike-answer.service';
import { DislikeAnswer } from 'src/dislike-answer/entities/dislike-answer.entity';

@Injectable()
export class AnswerService {
    constructor(
        @InjectRepository(Answer) private answerRepository: Repository<Answer>,
        private usersService: UsersService,
        private questionService: QuestionService,
        private likeAnswerService: LikeAnswerService,
        private disLikeAnswerService: DislikeAnswerService) {}

    async getAnswerById(answerId: number): Promise<Answer> {
        return this.answerRepository.findOneBy({id: answerId})
    } 

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

    async likeAnswer(userId: number, answerId: number): Promise<LikeAnswer> {
        try {
            const user: User = await this.usersService.findOneById(userId);
            const answer: Answer = await this.getAnswerById(answerId);
            if (user && answer ) {
                const like: LikeAnswer = await this.likeAnswerService.getLikeOnAnswer(user, answer);
                if (!like) {
                    return this.likeAnswerService.createLikeOnAnswer(user, answer);
                } else {
                    throw new HttpException('You already liked this answer', HttpStatus.BAD_REQUEST);
                }
            } else {
                if (!answer) {
                    throw new HttpException('This answer does not exist', HttpStatus.BAD_REQUEST);
                } else {
                    throw new HttpException('This user does not exist', HttpStatus.BAD_REQUEST);
                }
            }
        } catch(err) {
            throw err;
        }
    }

    async removeLikeAnswer(userId: number, answerId: number): Promise<boolean> {
        try {
            const user: User = await this.usersService.findOneById(userId);
            const answer: Answer = await this.getAnswerById(answerId);
            if (user && answer) {
                const like: LikeAnswer = await this.likeAnswerService.getLikeOnAnswer(user, answer);
                if (like) {
                    return this.likeAnswerService.removeLikeOnAnswer(like.id);
                } else {
                    throw new HttpException('You did not like this answer', HttpStatus.BAD_REQUEST);
                }
            } else {
                if (!answer) {
                    throw new HttpException('This answer does not exist', HttpStatus.BAD_REQUEST);
                } else {
                    throw new HttpException('This user does not exist', HttpStatus.BAD_REQUEST);
                }
            }
        } catch(err) {
            throw err;
        }
    }

    async dislikeAnswer(userId: number, answerId: number): Promise<DislikeAnswer> {
        try {
            const user: User = await this.usersService.findOneById(userId);
            const answer: Answer = await this.getAnswerById(answerId);
            if (user && answer ) {
                const dislike: DislikeAnswer = await this.disLikeAnswerService.getDislikeOnAnswer(user, answer);
                if (!dislike) {
                    return this.disLikeAnswerService.createDislikeOnAnswer(user, answer);
                } else {
                    throw new HttpException('You already disliked this answer', HttpStatus.BAD_REQUEST);
                }
            } else {
                if (!answer) {
                    throw new HttpException('This answer does not exist', HttpStatus.BAD_REQUEST);
                } else {
                    throw new HttpException('This user does not exist', HttpStatus.BAD_REQUEST);
                }
            }
        } catch(err) {
            throw err;
        }
    }

    async removeDislikeAnswer(userId: number, answerId: number): Promise<boolean> {
        try {
            const user: User = await this.usersService.findOneById(userId);
            const answer: Answer = await this.getAnswerById(answerId);
            if (user && answer) {
                const dislike: DislikeAnswer = await this.disLikeAnswerService.getDislikeOnAnswer(user, answer);
                if (dislike) {
                    return this.disLikeAnswerService.removeDislikeOnAnswer(dislike.id);
                } else {
                    throw new HttpException('You did not dislike this answer', HttpStatus.BAD_REQUEST);
                }
            } else {
                if (!answer) {
                    throw new HttpException('This answer does not exist', HttpStatus.BAD_REQUEST);
                } else {
                    throw new HttpException('This user does not exist', HttpStatus.BAD_REQUEST);
                }
            }
        } catch(err) {
            throw err;
        }
    }

}

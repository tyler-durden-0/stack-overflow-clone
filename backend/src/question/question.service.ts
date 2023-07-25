import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { createQuestionDto, updateQuestionDto } from './dto';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { TagService } from 'src/tag/tag.service';
import { Tag } from 'src/tag/entities/tag.entity';
import { LikeQuestion } from 'src/like-question/entities/like-question.entity';
import { LikeQuestionService } from 'src/like-question/like-question.service';
import { DislikeQuestionService } from 'src/dislike-question/dislike-question.service';
import { DislikeQuestion } from 'src/dislike-question/entities/dislike-question.entity';

@Injectable()
export class QuestionService {
    constructor(@InjectRepository(Question) private questionRepository: Repository<Question>,
    private usersService: UsersService,
    private tagsService: TagService,
    private likeQuestionService: LikeQuestionService,
    private dislikeQuestionService: DislikeQuestionService) {}

    async createQuestion(payload: Partial<createQuestionDto> & {userId: number}): Promise<Question> {
        const userEntity: User = await this.usersService.findOneById(payload.userId);

        const existingTags: Tag[] = await this.tagsService.findExistingTagsByArrayOfTheirNames(payload.tags);

        if (existingTags.length === payload.tags.length) {

            const newQuestionEntity: Question = new Question();
            newQuestionEntity.title = payload.title;
            newQuestionEntity.description = payload.description;
            newQuestionEntity.author = userEntity.email;
            newQuestionEntity.user = userEntity;
            newQuestionEntity.tags = existingTags;
    
            return this.questionRepository.save(newQuestionEntity);
        } else {
            throw new Error;
        }
    }

    async getQuestions(): Promise<Question[] | BadRequestException> {
        return this.questionRepository.find();
    }

    async getQuestionById(id: number): Promise<Question> {
        return this.questionRepository.findOneBy({id});
    }

    async getQuestionWithAnswersById(id: number): Promise<Question> {
        return this.questionRepository.findOne({relations: {answers: true}, where: {id}});
    }

    async getUsersQuestionById(id: number): Promise<Question> {
        return this.questionRepository.findOne({relations: {user: true}, where: {id}});
    }

    async updateQuestionById(payload: Partial<updateQuestionDto> & {questionId: number}): Promise<boolean> {
        try {
            const updatedQuesion: UpdateResult = await this.questionRepository.update(payload.questionId, {title: payload?.title, description: payload?.description, /*tags: payload?.tags,*/ dateOfUpdate: new Date()});
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

    async likeQuestion(userId: number, questionId: number): Promise<LikeQuestion> {
        try {
            const user: User = await this.usersService.findOneById(userId);
            const question: Question = await this.getQuestionById(questionId);
            if (user && question) {
                const like: LikeQuestion = await this.likeQuestionService.getLikeOnQuestion(user, question);
                if (!like) {
                    return this.likeQuestionService.createLikeOnQuestion(user, question);
                } else {
                    throw new HttpException('You already liked this question', HttpStatus.BAD_REQUEST);
                }
            } else {
                if (!question) {
                    throw new HttpException('This question does not exist', HttpStatus.BAD_REQUEST);
                } else {
                    throw new HttpException('This user does not exist', HttpStatus.BAD_REQUEST);
                }
            }
        } catch(err) {
            throw err;
        }
    }

    async removeLikeQuestion(userId: number, questionId: number): Promise<boolean> {
        try {
            const user: User = await this.usersService.findOneById(userId);
            const question: Question = await this.getQuestionById(questionId);
            if (user && question) {
                const like: LikeQuestion = await this.likeQuestionService.getLikeOnQuestion(user, question);
                if (like) {
                    return this.likeQuestionService.removeLikeOnQuestion(like.id);
                } else {
                    throw new HttpException('You did not like this question', HttpStatus.BAD_REQUEST);
                }
            } else {
                if (!question) {
                    throw new HttpException('This question does not exist', HttpStatus.BAD_REQUEST);
                } else {
                    throw new HttpException('This user does not exist', HttpStatus.BAD_REQUEST);
                }
            }
        } catch(err) {
            throw err;
        }
    }

    async dislikeQuestion(userId: number, answerId: number): Promise<DislikeQuestion> {
        try {
            const user: User = await this.usersService.findOneById(userId);
            const answer: Question = await this.getQuestionById(answerId);
            if (user && answer ) {
                const dislike: DislikeQuestion = await this.dislikeQuestionService.getDislikeOnQuestion(user, answer);
                if (!dislike) {
                    return this.dislikeQuestionService.createDislikeOnQuestion(user, answer);
                } else {
                    throw new HttpException('You already disliked this question', HttpStatus.BAD_REQUEST);
                }
            } else {
                if (!answer) {
                    throw new HttpException('This question does not exist', HttpStatus.BAD_REQUEST);
                } else {
                    throw new HttpException('This user does not exist', HttpStatus.BAD_REQUEST);
                }
            }
        } catch(err) {
            throw err;
        }
    }

    async removeDislikeQuestion(userId: number, answerId: number): Promise<boolean> {
        try {
            const user: User = await this.usersService.findOneById(userId);
            const answer: Question = await this.getQuestionById(answerId);
            if (user && answer) {
                const dislike: DislikeQuestion = await this.dislikeQuestionService.getDislikeOnQuestion(user, answer);
                if (dislike) {
                    return this.dislikeQuestionService.removeDislikeOnQuestion(dislike.id);
                } else {
                    throw new HttpException('You did not dislike this question', HttpStatus.BAD_REQUEST);
                }
            } else {
                if (!answer) {
                    throw new HttpException('This question does not exist', HttpStatus.BAD_REQUEST);
                } else {
                    throw new HttpException('This user does not exist', HttpStatus.BAD_REQUEST);
                }
            }
        } catch(err) {
            throw err;
        }
    }

}

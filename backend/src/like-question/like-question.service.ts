import { Injectable } from '@nestjs/common';
import { Question } from 'src/question/entities/question.entity';
import { User } from 'src/users/entities/user.entity';
import { LikeQuestion } from './entities/like-question.entity';
import { DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class LikeQuestionService {
    constructor(@InjectRepository(LikeQuestion) private likeQuestionRepository: Repository<LikeQuestion>) {}

    async createLikeOnQuestion(user: User, question: Question): Promise<LikeQuestion> {
        const likeOnQuestion: LikeQuestion = new LikeQuestion();
        likeOnQuestion.user = user;
        likeOnQuestion.question = question;
        return this.likeQuestionRepository.save(likeOnQuestion);
    }

    async removeLikeOnQuestion(likeId: number): Promise<boolean> {
        try {
            const deleteResult: DeleteResult = await this.likeQuestionRepository.delete({id: likeId});
            return deleteResult.affected > 0;
        } catch(err) {
            throw err;
        }
    }

    async getLikeOnQuestion(user: User, question: Question): Promise<LikeQuestion> {
        return this.likeQuestionRepository.findOne({where: {user, question: {id: question.id}}});
    }

}

import { Injectable } from '@nestjs/common';
import { Question } from 'src/question/entities/question.entity';
import { User } from 'src/users/entities/user.entity';
import { DislikeQuestion } from './entities/dislike-question.entity';
import { DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class DislikeQuestionService {
    constructor(@InjectRepository(DislikeQuestion) private dislikeQuestionRepository: Repository<DislikeQuestion>) {}

    async createDislikeOnQuestion(user: User, question: Question): Promise<DislikeQuestion> {
        const dislikeOnQuestion: DislikeQuestion = new DislikeQuestion();
        dislikeOnQuestion.user = user;
        dislikeOnQuestion.question = question;
        return this.dislikeQuestionRepository.save(dislikeOnQuestion);
    }

    async removeDislikeOnQuestion(likeId: number): Promise<boolean> {
        try {
            const deleteResult: DeleteResult = await this.dislikeQuestionRepository.delete({id: likeId});
            return deleteResult.affected > 0;
        } catch(err) {
            throw err;
        }
    }

    async getDislikeOnQuestion(user: User, question: Question): Promise<DislikeQuestion> {
        return this.dislikeQuestionRepository.findOne({where: {user, question: {id: question.id}}});
    }

}

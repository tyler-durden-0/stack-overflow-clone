import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DislikeAnswer } from './entities/dislike-answer.entity';
import { DeleteResult, Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Answer } from 'src/answer/entities/answer.entity';

@Injectable()
export class DislikeAnswerService {
    constructor(@InjectRepository(DislikeAnswer) private dislikeAnswerRepository: Repository<DislikeAnswer>) {}

    async createDislikeOnAnswer(user: User, answer: Answer): Promise<DislikeAnswer> {
        const dislikeOnAnswer: DislikeAnswer = new DislikeAnswer();
        dislikeOnAnswer.user = user;
        dislikeOnAnswer.answer = answer;
        return this.dislikeAnswerRepository.save(dislikeOnAnswer)
    }

    async removeDislikeOnAnswer(likeId: number): Promise<boolean> {
        try {
            const deleteResult: DeleteResult = await this.dislikeAnswerRepository.delete({id: likeId});
            return deleteResult.affected > 0;
        } catch(err) {
            throw err;
        }
    }

    async getDislikeOnAnswer(user: User, answer: Answer): Promise<DislikeAnswer> {
        return this.dislikeAnswerRepository.findOne({where: {user, answer: {id: answer.id}}});
    }

}

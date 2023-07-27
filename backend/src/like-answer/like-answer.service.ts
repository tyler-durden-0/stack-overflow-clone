import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LikeAnswer } from './entities/like-answer.entity';
import { DeleteResult, Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Answer } from 'src/answer/entities/answer.entity';

@Injectable()
export class LikeAnswerService {
    constructor(@InjectRepository(LikeAnswer) private likeAnswerRepository: Repository<LikeAnswer>) {}

    async createLikeOnAnswer(user: User, answer: Answer): Promise<LikeAnswer> {
        const likeOnAnswer: LikeAnswer = new LikeAnswer();
        likeOnAnswer.user = user;
        likeOnAnswer.answer = answer;
        return this.likeAnswerRepository.save(likeOnAnswer)
    }

    async removeLikeOnAnswer(likeId: number): Promise<boolean> {
        try {
            const deleteResult: DeleteResult = await this.likeAnswerRepository.delete({id: likeId});
            return deleteResult.affected > 0;
        } catch(err) {
            throw err;
        }
    }

    async getLikeOnAnswer(user: User, answer: Answer): Promise<LikeAnswer> {
        return this.likeAnswerRepository.findOne({where: {user, answer: {id: answer.id}}});
    }

}

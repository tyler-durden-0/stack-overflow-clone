import { BadRequestException, Body, Controller, Delete, ForbiddenException, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { createAnswerDto, updateAnswerDto, upvoteAnswerDto, downvoteAnswerDto } from './dto';
import { Role, Roles, RolesGuard } from 'src/auth/roles';
import { AuthGuard } from 'src/auth/guard';
import { Answer } from './entities/answer.entity';
import { LikeAnswer } from 'src/like-answer/entities/like-answer.entity';
import { DislikeAnswer } from 'src/dislike-answer/entities/dislike-answer.entity';
import { ApiBearerAuth, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

@Controller('answer')
@Roles(Role.user)
@UseGuards(AuthGuard, RolesGuard)
@ApiTags('Answer')
@ApiBearerAuth('JWT-auth')
@ApiUnauthorizedResponse({ description: 'Unauthorized, please login' })
export class AnswerController {
    constructor(private answerService: AnswerService) {}

    @Post()
    async createAnswer(@Body() payload: createAnswerDto, @Req() req: any) {
        try {
            const userId: number = req.user.userId;
            return await this.answerService.createAnswer({...payload, userId});
        } catch {
            throw new BadRequestException();
        }
    }

    @Patch('/:id')
    @Roles(Role.admin)
    async updateAnswer(@Body() payload: updateAnswerDto, @Param('id') answerId: number, @Req() req: any) {
        try {
            const userId: number = req.user.userId;
            const userRole: string = req.user.roles;
            if (userRole === Role.user) {
                const usersAnswer: Answer = await this.answerService.getUsersAnswerById(answerId);

                if (usersAnswer && usersAnswer.user.id === userId) {
                    const isUpdated: boolean = await this.answerService.updateAnswer({...payload, userId, answerId});
                    return {success: isUpdated};
                } else {
                    if (!usersAnswer) {
                        throw new BadRequestException();
                    } else {
                        throw new ForbiddenException();
                    }
                }  
            } else {
                const isUpdated: boolean = await this.answerService.updateAnswer({...payload, userId, answerId});
                return {success: isUpdated};
            }
        } catch(err) {
            if (err.status === 403) {
                throw new ForbiddenException();
            } else {
                throw new BadRequestException();
            }
        }
    }

    
    @Delete('/:id')
    @Roles(Role.admin)
    async deleteAnswer(@Param('id') answerId: number, @Req() req: any) {
        try {
            const userId: number = req.user.userId;
            const userRole: string = req.user.roles;
            if (userRole === Role.user) {
                const usersAnswer: Answer = await this.answerService.getUsersAnswerById(answerId);
                if (usersAnswer && usersAnswer.user.id === userId) {
                    const isDeleted: boolean = await this.answerService.deleteAnswerById(answerId);
                    return {success: isDeleted};
                } else {
                    if (!usersAnswer) {
                        throw new BadRequestException();
                    } else {
                        throw new ForbiddenException();
                    }
                }  
            } else {
                const isDeleted: boolean = await this.answerService.deleteAnswerById(answerId);
                return {success: isDeleted};
            }
        } catch(err) {
            if (err.status === 403) {
                throw new ForbiddenException();
            } else {
                throw new BadRequestException();
            }
        }
    }
    
    @Post('/:id/upvote')
    async upvoteAnswer(@Param('id') answerId: number, @Body() upvoteAnswerDto: upvoteAnswerDto, @Req() req: any) {
        try {
            const userId: number = req.user.userId;
            if (upvoteAnswerDto.increase) {
                const isLikeCreated: LikeAnswer = await this.answerService.likeAnswer(userId, answerId);
                return {success: !!isLikeCreated};
            } else {
                const isLikeDeleted: boolean = await this.answerService.removeLikeAnswer(userId, answerId);
                return {success: isLikeDeleted};
            }
        } catch(err) {
            throw err
        }
    }
    
    @Post('/:id/downvote')
    async downvoteAnswer(@Param('id') answerId: number, @Body() downvoteAnswerDto: downvoteAnswerDto, @Req() req: any) {
        try {
            const userId: number = req.user.userId;
            if (downvoteAnswerDto.increase) {
                const isDislikeCreated: DislikeAnswer = await this.answerService.dislikeAnswer(userId, answerId);
                return {success: !!isDislikeCreated};
            } else {
                const isDislikeDeleted: boolean = await this.answerService.removeDislikeAnswer(userId, answerId);
                return {success: isDislikeDeleted};
            }
        } catch(err) {
            throw err
        }
    }
}

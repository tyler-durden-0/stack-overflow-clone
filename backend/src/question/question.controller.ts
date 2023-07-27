import { BadRequestException, Body, Controller, Delete, ForbiddenException, Get, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { QuestionService } from './question.service';
import { createQuestionDto, upvoteQuestionDto, downvoteQuestionDto, filterByTagDto } from './dto';
import { Question } from './entities/question.entity';
import { AuthGuard } from 'src/auth/guard';
import { Role, Roles, RolesGuard } from 'src/auth/roles';
import { updateQuestionDto } from './dto/updateQuestion.dto';
import { LikeQuestion } from 'src/like-question/entities/like-question.entity';
import { DislikeQuestion } from 'src/dislike-question/entities/dislike-question.entity';
import { ApiBearerAuth, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

@Controller('question')
@UseGuards(AuthGuard)
@ApiTags('Question')
@ApiBearerAuth('JWT-auth')
@ApiUnauthorizedResponse({ description: 'Unauthorized, please login' })
export class QuestionController {
    constructor(private questionService: QuestionService) {}

    @Get('')
    async getQuestions() {
        try {
            const questions: Question[] | BadRequestException = await this.questionService.getQuestions();
            return {questions};
        } catch {
            throw new BadRequestException();
        }
    }

    @Get('/:id')
    async getQuestionById(@Param('id') id: number) {
        try {
            const question: Question = await this.questionService.getQuestionWithAnswersById(id);
            return {question};
        } catch {
            throw new BadRequestException();
        }
    }

    @Post('')
    @Roles(Role.user)
    @UseGuards(RolesGuard)
    async createQuestion(@Body() payload: createQuestionDto, @Req() req: any) {
        try {
            const userId: number = req.user.userId;
            const newQuestionEntity: Question | BadRequestException = await this.questionService.createQuestion({...payload, userId});
            return {question: newQuestionEntity};
        } catch {
            throw new BadRequestException();
        }
    }

    @Patch('/:id')
    @Roles(Role.user, Role.admin)
    @UseGuards(RolesGuard)
    async updateQuestion(@Param('id') id: number, @Body() payload: updateQuestionDto, @Req() req: any) {
        try {
            const userId: number = req.user.userId;
            const userRole: string = req.user.roles;
            if (userRole === Role.user) {
                const usersQuestion: Question = await this.questionService.getUsersQuestionById(id);

                if (usersQuestion && usersQuestion.user.id === userId) {
                    const isUpdated: boolean = await this.questionService.updateQuestionById({...payload, questionId: id});
                    return {success: isUpdated};
                } else {
                    if (!usersQuestion) {
                        throw new BadRequestException();
                    } else {
                        throw new ForbiddenException();
                    }
                }  
            } else {
                const isUpdated: boolean = await this.questionService.updateQuestionById({...payload, questionId: id});
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
    @Roles(Role.user, Role.admin)
    @UseGuards(RolesGuard)
    async deleteQuestion(@Param('id') id: number,  @Req() req: any) {
        try {
            const userId: number = req.user.userId;
            const userRole: string = req.user.roles;
            if (userRole === Role.user) {
                const usersQuestion: Question = await this.questionService.getUsersQuestionById(id);
                if (usersQuestion && usersQuestion.user.id === userId) {
                    const isDeleted: boolean = await this.questionService.deleteQuestionById(id);
                    return {success: isDeleted};
                } else {
                    if (!usersQuestion) {
                        throw new BadRequestException();
                    } else {
                        throw new ForbiddenException();
                    }
                }  
            } else {
                const isDeleted: boolean = await this.questionService.deleteQuestionById(id);
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
    @Roles(Role.user)
    @UseGuards(RolesGuard)
    async upvoteQuestion(@Param('id') questionId: number, @Body() upvoteQuestionDto: upvoteQuestionDto, @Req() req: any) {
        try {
            const userId: number = req.user.userId;
            if (upvoteQuestionDto.increase) {
                const isLikeCreated: LikeQuestion = await this.questionService.likeQuestion(userId, questionId);
                return {success: !!isLikeCreated};
            } else {
                const isLikeDeleted: boolean = await this.questionService.removeLikeQuestion(userId, questionId);
                return {success: isLikeDeleted};
            }
        } catch(err) {
            throw err
        }
    }

    @Post('/:id/downvote')
    @Roles(Role.user)
    @UseGuards(RolesGuard)
    async downvoteQuestion(@Param('id') answerId: number, @Body() downvoteQuestionDto: downvoteQuestionDto, @Req() req: any) {
        try {
            const userId: number = req.user.userId;
            if (downvoteQuestionDto.increase) {
                const isDislikeCreated: DislikeQuestion = await this.questionService.dislikeQuestion(userId, answerId);
                return {success: !!isDislikeCreated};
            } else {
                const isDislikeDeleted: boolean = await this.questionService.removeDislikeQuestion(userId, answerId);
                return {success: isDislikeDeleted};
            }
        } catch(err) {
            throw err
        }
    }

    @Get('/filter/tags')
    @Roles(Role.user)
    @UseGuards(RolesGuard)
    async getQuestionsByTags(@Query('tags') tags: string[]) {
        try {
            console.log('@@@tags', tags);
            if (!Array.isArray(tags)) {
                tags = [tags];
            }
            return await this.questionService.getQuestionsByArrayOfTagNames(tags);
        } catch(err) {
            throw err;
        }
    }
}

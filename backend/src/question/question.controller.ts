import { BadRequestException, Body, Controller, Delete, ForbiddenException, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { QuestionService } from './question.service';
import { createQuestionDto } from './dto';
import { Question } from './entity/question.entity';
import { AuthGuard } from 'src/auth/guard';
import { Role, Roles, RolesGuard } from 'src/auth/roles';
import { updateQuestionDto } from './dto/updateQuestion.dto';

@Controller('question')
export class QuestionController {
    constructor(private questionService: QuestionService) {}

    @Get('')
    @UseGuards(AuthGuard)
    async getQuestions() {
        try {
            const questions: Question[] | BadRequestException = await this.questionService.getQuestions();
            return {questions};
        } catch {
            throw new BadRequestException();
        }
    }

    @Get('/:id')
    @UseGuards(AuthGuard)
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
    @UseGuards(AuthGuard, RolesGuard)
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
    @UseGuards(AuthGuard, RolesGuard)
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
    @UseGuards(AuthGuard, RolesGuard)
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
}

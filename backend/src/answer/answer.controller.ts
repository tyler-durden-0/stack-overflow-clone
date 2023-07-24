import { BadRequestException, Body, Controller, Delete, ForbiddenException, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { createAnswerDto, updateAnswerDto } from './dto';
import { Role, Roles, RolesGuard } from 'src/auth/roles';
import { AuthGuard } from 'src/auth/guard';
import { Answer } from './entities/answer.entity';

@Controller('answer')
export class AnswerController {
    constructor(private answerService: AnswerService) {}

    @Post()
    @Roles(Role.user, Role.admin)
    @UseGuards(AuthGuard, RolesGuard)
    async createAnswer(@Body() payload: createAnswerDto, @Req() req: any) {
        try {
            const userId: number = req.user.userId;
            return await this.answerService.createAnswer({...payload, userId});
        } catch {
            throw new BadRequestException();
        }
    }

    @Patch('/:id')
    @Roles(Role.user, Role.admin)
    @UseGuards(AuthGuard, RolesGuard)
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
    @Roles(Role.user, Role.admin)
    @UseGuards(AuthGuard, RolesGuard)
    async deleteQuestion(@Param('id') answerId: number, @Req() req: any) {
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
}

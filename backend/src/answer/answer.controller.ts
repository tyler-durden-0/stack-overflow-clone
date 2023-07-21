import { BadRequestException, Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { createAnswerDto } from './dto';
import { Role, Roles, RolesGuard } from 'src/auth/roles';
import { AuthGuard } from 'src/auth/guard';

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
}

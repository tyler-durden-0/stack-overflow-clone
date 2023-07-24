import { IsNotEmpty, IsString } from 'class-validator';

export class updateAnswerDto {
  @IsNotEmpty()
  @IsString()
  text: string;
  
  @IsNotEmpty()
  @IsString()
  questionId: number;
}

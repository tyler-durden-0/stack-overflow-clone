import { IsNotEmpty, IsString } from 'class-validator';

export class createAnswerDto {
  @IsNotEmpty()
  @IsString()
  text: string;

  @IsNotEmpty()
  @IsString()
  questionId: number;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class updateAnswerDto {
  @ApiProperty({ type: String, description: 'text' })
  @IsNotEmpty()
  @IsString()
  text: string;
  
  @ApiProperty({ type: Number, description: 'questionId' })
  @IsNotEmpty()
  @IsString()
  questionId: number;
}

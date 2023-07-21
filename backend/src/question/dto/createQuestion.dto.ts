import { IsArray, IsEmpty, IsNotEmpty, IsString } from 'class-validator';

export class createQuestionDto {
  @IsNotEmpty()
  @IsString()
  author: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsArray()
  @IsString({each: true})
  @IsEmpty({each: true})
  tags: string[];
}

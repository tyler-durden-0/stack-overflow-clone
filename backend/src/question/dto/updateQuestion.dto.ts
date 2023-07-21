import { IsArray, IsEmpty, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class updateQuestionDto {
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  title: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  description: string;

  @IsArray()
  @IsString({each: true})
  @IsEmpty({each: true})
  @IsOptional()
  tags: string[];
}

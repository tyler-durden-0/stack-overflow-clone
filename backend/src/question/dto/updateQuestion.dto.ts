import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEmpty, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class updateQuestionDto {
  @ApiProperty({ type: String, description: 'title', required: false })
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  title: string;

  @ApiProperty({ type: String, description: 'description', required: false })
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty({ type: [String], description: 'tags', required: false })
  @IsArray()
  @IsString({each: true})
  @IsEmpty({each: true})
  @IsOptional()
  tags: string[];
}

import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEmpty, IsNotEmpty, IsString } from 'class-validator';

export class createQuestionDto {
  @ApiProperty({ type: String, description: 'title' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ type: String, description: 'description' })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ type: [String], description: 'tags' })
  @IsArray()
  @IsString({each: true})
  @IsEmpty({each: true})
  tags: string[];
}

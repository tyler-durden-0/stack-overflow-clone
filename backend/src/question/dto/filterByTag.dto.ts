import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class filterByTagDto {
  @ApiProperty({ type: [String], description: 'tags' })
  @IsArray()
  @IsString({each: true})
  @IsNotEmpty({each: true})
  tags: string[];
}

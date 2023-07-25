import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class filterByTagDto {
  @IsArray()
  @IsString({each: true})
  @IsNotEmpty({each: true})
  tags: string[];
}

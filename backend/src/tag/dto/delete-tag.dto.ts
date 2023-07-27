import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteTagDto {
  @ApiProperty({ type: String, description: 'name' })
  @IsNotEmpty()
  @IsString()
  name: string;
}

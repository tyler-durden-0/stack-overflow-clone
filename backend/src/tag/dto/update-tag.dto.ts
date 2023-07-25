import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateTagDto {
  @ApiProperty({ type: String, description: 'name' })
  @IsString()
  name: string;

  @ApiProperty({ type: String, description: 'newName' })
  @IsString()
  newName: string;

  @ApiProperty({ type: String, description: 'newDescription', required: false })
  @IsOptional()
  @IsString()
  newDescription: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class refreshDto {
  @ApiProperty({ type: String, description: 'refresh_token' })
  @IsNotEmpty()
  refresh_token: string;
}

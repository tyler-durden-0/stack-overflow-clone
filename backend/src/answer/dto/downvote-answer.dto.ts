import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty } from 'class-validator';

export class downvoteAnswerDto {
  @ApiProperty({ type: Boolean, description: 'increase' })
  @IsNotEmpty()
  @IsBoolean()
  increase: boolean;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty } from 'class-validator';

export class upvoteAnswerDto {
  @ApiProperty({ type: Boolean, description: 'increase' })
  @IsNotEmpty()
  @IsBoolean()
  increase: boolean;
}

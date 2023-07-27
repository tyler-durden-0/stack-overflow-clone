import { ApiProperty } from '@nestjs/swagger';
import {IsBoolean, IsNotEmpty} from 'class-validator';

export class downvoteQuestionDto {
  @ApiProperty({ type: Boolean, description: 'increase' })
  @IsNotEmpty()
  @IsBoolean()
  increase: boolean;
}

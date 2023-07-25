import {IsBoolean, IsNotEmpty} from 'class-validator';

export class downvoteQuestionDto {
  @IsNotEmpty()
  @IsBoolean()
  increase: boolean;
}

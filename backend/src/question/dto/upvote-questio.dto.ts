import {IsBoolean, IsNotEmpty} from 'class-validator';

export class upvoteQuestionDto {
  @IsNotEmpty()
  @IsBoolean()
  increase: boolean;
}

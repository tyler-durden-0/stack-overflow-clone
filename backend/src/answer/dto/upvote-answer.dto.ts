import { IsBoolean, IsNotEmpty } from 'class-validator';

export class upvoteAnswerDto {
  @IsNotEmpty()
  @IsBoolean()
  increase: boolean;
}

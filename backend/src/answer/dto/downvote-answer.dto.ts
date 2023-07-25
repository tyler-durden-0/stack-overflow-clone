import { IsBoolean, IsNotEmpty } from 'class-validator';

export class downvoteAnswerDto {
  @IsNotEmpty()
  @IsBoolean()
  increase: boolean;
}

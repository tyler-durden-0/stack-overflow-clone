import { IsBoolean, IsNotEmpty } from 'class-validator';

export class dwonvoteAnswerDto {
  @IsNotEmpty()
  @IsBoolean()
  increase: boolean;
}

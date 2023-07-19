import { IsNotEmpty } from 'class-validator';

export class logOutDto {
  @IsNotEmpty()
  userId: number;
}

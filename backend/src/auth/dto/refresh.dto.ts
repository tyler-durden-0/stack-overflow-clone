import { IsNotEmpty } from 'class-validator';

export class refreshDto {
  @IsNotEmpty()
  refresh_token: string;
}

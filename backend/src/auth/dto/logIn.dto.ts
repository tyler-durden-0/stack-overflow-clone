import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class logInDto {
  @ApiProperty({ type: String, description: 'email' })
  @IsNotEmpty()
  email: string;

  @ApiProperty({ type: String, description: 'password' })
  @IsNotEmpty()
  password: string;
}

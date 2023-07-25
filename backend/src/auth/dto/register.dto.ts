import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class registerUserDto {
  @ApiProperty({ type: String, description: 'firstName' })
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ type: String, description: 'lastName' })
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ type: String, description: 'password' })
  @IsNotEmpty()
  password: string;

  @ApiProperty({ type: String, description: 'email' })
  @IsNotEmpty()
  email: string;

  @ApiProperty({ type: Boolean, description: 'isAdmin' })
  @IsNotEmpty()
  isAdmin: boolean;
}

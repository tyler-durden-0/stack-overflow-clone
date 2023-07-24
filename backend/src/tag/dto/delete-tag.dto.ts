import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteTagDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}

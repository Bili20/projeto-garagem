import { IsNotEmpty, IsNumber } from 'class-validator';

export class DeletaPostDTO {
  @IsNumber()
  @IsNotEmpty()
  id: number;
}

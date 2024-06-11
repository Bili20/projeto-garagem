import { IsNumber, IsString } from 'class-validator';

export class SalvarMidiaPostDTO {
  @IsString()
  nome: string;

  @IsNumber()
  idPostagem: number;
}

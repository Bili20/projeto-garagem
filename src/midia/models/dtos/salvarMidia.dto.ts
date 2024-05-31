import { IsNumber, IsString } from 'class-validator';

export class SalvarMidiaDTO {
  @IsString()
  nome: string;

  @IsNumber()
  idPostagem: number;
}

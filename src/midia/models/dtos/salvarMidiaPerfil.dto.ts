import { IsNumber, IsString } from 'class-validator';

export class SalvarMidiaPerfilDTO {
  @IsString()
  nome: string;

  @IsNumber()
  idPessoa: number;
}

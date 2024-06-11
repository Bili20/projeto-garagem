import { IsString } from 'class-validator';

export class AtualizaMidiaDTO {
  @IsString()
  nome: string;

  @IsString()
  idPessoa: number;
}

import { IsNotEmpty, IsNumber, IsString, MinLength } from 'class-validator';

export class CadastroEnderecoDTO {
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  cep: string;

  @IsString()
  bairro: string;

  @IsString()
  numero: string;

  @IsString()
  logradouro: string;

  @IsString()
  uf: string;

  @IsNumber()
  idPessoa: number;
}

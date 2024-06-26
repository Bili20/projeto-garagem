import { IsNumber, IsPostalCode, IsString } from 'class-validator';

export class CadastroEnderecoDTO {
  @IsString()
  rua: string;

  @IsString()
  numero: string;

  @IsString()
  complemento: string;

  @IsString()
  bairro: string;

  @IsString()
  cidade: string;

  @IsString()
  uf: string;

  @IsString()
  cep: string;

  @IsNumber()
  idPessoa: number;
}

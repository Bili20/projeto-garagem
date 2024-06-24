import { IsNumber, IsString } from 'class-validator';

export class DadosEnderecoDTO {
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
}

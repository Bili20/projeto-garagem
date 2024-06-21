import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class DadosCartaoDTO {
  @IsString()
  @IsOptional()
  nomePessoa?: string;

  @IsString()
  @MaxLength(16)
  numeroCartao: string;

  @IsString()
  expMes: string;

  @IsString()
  expAno: string;

  @IsString()
  @MaxLength(3)
  codigoSeguranca: string;
}

import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class AtualizaPessoaDTO {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  nome: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  documento: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  dataNacimento: Date;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  sexo: string;

  @IsNumber()
  @IsOptional()
  postGratuito: number;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  email: string;
}

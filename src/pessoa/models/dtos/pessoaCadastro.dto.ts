import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';

enum sexos {
  M = 'Masculino',
  F = 'Feminino',
  O = 'Outro',
}

export class PessoaCadastroDTO {
  @IsString()
  nome: string;

  @IsString()
  documento: string;

  @IsString()
  dataNacimento: Date;

  @IsEnum(sexos)
  sexo: sexos;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  senha: string;
}

import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class PessoaCadastroDTO {
  @IsString()
  nome: string;

  @IsString()
  documento: string;

  @IsString()
  dataNacimento: Date;

  @IsString()
  sexo: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  senha: string;
}

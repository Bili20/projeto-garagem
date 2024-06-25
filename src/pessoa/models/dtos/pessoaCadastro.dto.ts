import { Type } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

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
  telefone: string;

  @IsString()
  @IsNotEmpty()
  senha: string;
}

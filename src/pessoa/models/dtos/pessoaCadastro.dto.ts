import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { sexosEnum } from '../entities/pessoa.entity';

export class PessoaCadastroDTO {
  @IsString()
  nome: string;

  @IsString()
  documento: string;

  @IsString()
  dataNacimento: Date;

  @IsEnum(sexosEnum)
  sexo: sexosEnum;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  senha: string;
}

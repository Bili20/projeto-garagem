import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class AtualizaPostDTO {
  @IsString()
  @IsOptional()
  @MinLength(3)
  titulo: string;

  @IsString()
  @IsOptional()
  @MinLength(5)
  descricao: string;

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  valor: number;
}

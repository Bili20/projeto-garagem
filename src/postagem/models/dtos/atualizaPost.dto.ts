import { IsNumber, IsOptional, IsString } from 'class-validator';

export class AtualizaPostDTO {
  @IsString()
  @IsOptional()
  descricao: string;

  @IsNumber()
  @IsOptional()
  valor: number;
}

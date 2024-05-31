import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CriarPostagemDTO {
  @IsString()
  titulo: string;

  @IsOptional()
  @IsString()
  status: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  idPessoa: number;
}

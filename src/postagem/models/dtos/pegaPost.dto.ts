import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class PegaPostesDTO {
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  quantidade: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  pagina: number;
}

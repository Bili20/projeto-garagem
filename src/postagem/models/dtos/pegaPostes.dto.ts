import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class PegaPostesDTO {
  @IsNumber()
  @Type(() => Number)
  quantidade: number;

  @IsNumber()
  @Type(() => Number)
  pagina: number;
}

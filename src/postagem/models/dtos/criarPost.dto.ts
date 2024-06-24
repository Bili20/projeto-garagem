import { Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
import { DadosCartaoDTO } from 'src/pagamento/models/dto/dadosCartao.dto';

export class CriarPostagemDTO {
  @IsString()
  titulo: string;

  @IsOptional()
  @IsString()
  status: string;

  @IsOptional()
  @IsString()
  descricao: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  idPessoa?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  valor: number;

  @IsBoolean()
  @Transform(({ value }) => {
    return [true, 'enabled', 'true', 1, '1'].indexOf(value) > -1;
  })
  @IsOptional()
  anuncio: boolean;

  @IsOptional()
  dadosCartao?: DadosCartaoDTO;
}

import { IsString } from 'class-validator';

export class CriarPostagenDTO {
  @IsString()
  titulo: string;
}

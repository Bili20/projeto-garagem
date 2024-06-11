import { PessoaEntity } from 'src/pessoa/models/entities/pessoa.entity';
import { LoginDTO } from '../dtos/login.dto';

export interface IAutenticacaoRepo {
  buscaPorEmail(email: string): Promise<PessoaEntity>;
}

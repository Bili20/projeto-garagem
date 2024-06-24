import { promises } from 'dns';
import { CadastroEnderecoDTO } from '../dto/cadastroEndereco.dto';
import { EnderecoEntity } from '../entities/endedreco.entity';

export interface IEnderecoRepo {
  cadastrar(param: CadastroEnderecoDTO): Promise<void>;
  buscaUmEndereco(idPEssoa: number): Promise<EnderecoEntity>;
}

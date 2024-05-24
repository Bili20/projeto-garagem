import { CadastroEnderecoDTO } from '../dto/cadastroEndereco.dto';

export interface IEnderecoRepo {
  cadastrar(param: CadastroEnderecoDTO): Promise<void>;
}

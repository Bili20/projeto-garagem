import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CadastroEnderecoDTO } from 'src/endereco/models/dto/cadastroEndereco.dto';
import { IEnderecoRepo } from 'src/endereco/models/interfaces/enderecoRepo.interface';
import { BuscaUmaPEssoaUseCase } from 'src/pessoa/useCases/buscaUmaPessoa/buscaUmaPessoa.use-case';

@Injectable()
export class EnderecoCadastroUseCase {
  @Inject('IEnderecoRepo')
  private readonly enderecoRepo: IEnderecoRepo;
  @Inject(BuscaUmaPEssoaUseCase)
  private readonly buscaPessoaUseCase: BuscaUmaPEssoaUseCase;

  async execute(param: CadastroEnderecoDTO) {
    const pessoa = await this.buscaPessoaUseCase.execute(param.idPessoa);
    if (!pessoa) {
      throw new BadRequestException({ message: 'Usuario não encontrado' });
    }
    return await this.enderecoRepo.cadastrar(param);
  }
}

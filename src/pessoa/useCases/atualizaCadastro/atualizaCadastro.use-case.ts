import { Inject, Injectable } from '@nestjs/common';
import { AtualizaPessoaDTO } from 'src/pessoa/models/dtos/atualizaPessoa.dto';
import { PessoaEntity } from 'src/pessoa/models/entities/pessoa.entity';
import { IPessoaRepo } from 'src/pessoa/models/interfaces/pessoa.interface';
import { BuscaUmaPEssoaUseCase } from '../buscaUmaPessoa/buscaUmaPessoa.use-case';

@Injectable()
export class AtualizaCadastroUseCase {
  @Inject('IPessoaRepo')
  private readonly pessoaRepo: IPessoaRepo;
  @Inject(BuscaUmaPEssoaUseCase)
  private readonly buscaUmaPessoaUseCase: BuscaUmaPEssoaUseCase;

  async execute(id: number, param: AtualizaPessoaDTO) {
    const pessoaCadastro = await this.buscaUmaPessoaUseCase.execute(id);

    const pessoa = new PessoaEntity(param);
    this.pessoaRepo.atualizar(id, pessoa);

    return pessoaCadastro;
  }
}

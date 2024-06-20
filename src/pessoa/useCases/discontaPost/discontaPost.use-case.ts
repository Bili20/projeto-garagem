import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { IPessoaRepo } from 'src/pessoa/models/interfaces/pessoa.interface';
import { BuscaUmaPEssoaUseCase } from '../buscaUmaPessoa/buscaUmaPessoa.use-case';

@Injectable()
export class DiscontaPostGratuitoUseCase {
  @Inject('IPessoaRepo')
  private readonly pessoaRepo: IPessoaRepo;
  @Inject(BuscaUmaPEssoaUseCase)
  private readonly buscaUmaPessoaUseCase: BuscaUmaPEssoaUseCase;

  async execute(idPessoa: number) {
    try {
      const pessoa = await this.buscaUmaPessoaUseCase.execute(idPessoa);
      if (pessoa.postGratuito > 0) {
        pessoa.postGratuito = pessoa.postGratuito - 1;
      }
      delete pessoa.midia;
      await this.pessoaRepo.atualizar(idPessoa, pessoa);
      return pessoa;
    } catch (e) {
      throw new BadRequestException({ message: 'Erro ao atualizar disconto' });
    }
  }
}

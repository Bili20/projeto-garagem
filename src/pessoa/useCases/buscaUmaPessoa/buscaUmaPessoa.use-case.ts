import { Inject, Injectable } from '@nestjs/common';
import { IPessoaRepo } from 'src/pessoa/models/interfaces/pessoa.interface';

@Injectable()
export class BuscaUmaPEssoaUseCase {
  @Inject('IPessoaRepo')
  private readonly pessoaRepo: IPessoaRepo;

  async execute(id: number) {
    return this.pessoaRepo.buscarUmaPessoa(id);
  }
}

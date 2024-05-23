import { Inject, Injectable } from '@nestjs/common';
import { IPessoaRepo } from 'src/pessoa/models/interfaces/pessoa.interface';

@Injectable()
export class BuscaPessoasUsecase {
  @Inject('IPessoaRepo')
  private readonly pessoaRepo: IPessoaRepo;

  async execute() {
    return await this.pessoaRepo.buscarPessoas();
  }
}

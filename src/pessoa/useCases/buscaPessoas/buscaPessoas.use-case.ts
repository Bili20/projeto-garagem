import { Inject, Injectable } from '@nestjs/common';
import { URLIMAGE } from 'src/constants/constants';
import { IPessoaRepo } from 'src/pessoa/models/interfaces/pessoa.interface';

@Injectable()
export class BuscaPessoasUsecase {
  @Inject('IPessoaRepo')
  private readonly pessoaRepo: IPessoaRepo;

  async execute() {
    const pessoas = await this.pessoaRepo.buscarPessoas();
    for (const pessoa of pessoas) {
      if (pessoa.midia) {
        pessoa.midia.nome = URLIMAGE + '/files/perfil/' + pessoa.midia.nome;
      }
    }
    return pessoas;
  }
}

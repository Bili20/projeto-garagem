import { Inject, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { IPessoaRepo } from 'src/pessoa/models/interfaces/pessoa.interface';
import { URLIMAGE } from 'src/utils/constants/constants';
import { UsuarioAtualUseCase } from 'src/utils/usuarioAtual/usuarioAtual.use-case';

@Injectable()
export class BuscaInfoPessoaUseCase {
  @Inject('IPessoaRepo')
  private readonly pessoaRepo: IPessoaRepo;
  @Inject(UsuarioAtualUseCase)
  private readonly usuarioAtualUseCase: UsuarioAtualUseCase;

  async execute(req: Request) {
    const idPessoa = (await this.usuarioAtualUseCase.execute(req)).id;
    const pessoa = await this.pessoaRepo.buscaInformacoePessoa(idPessoa);
    if (pessoa.midia) {
      pessoa.midia.nome = URLIMAGE + '/files/perfil/' + pessoa.midia.nome;
    }
    delete pessoa.senha;
    return pessoa;
  }
}

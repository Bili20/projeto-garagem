import { Inject, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { BuscaUmaPEssoaUseCase } from 'src/pessoa/useCases/buscaUmaPessoa/buscaUmaPessoa.use-case';
import { DiscontaPostGratuitoUseCase } from 'src/pessoa/useCases/discontaPost/discontaPost.use-case';
import { CriarPostagemDTO } from 'src/postagem/models/dtos/criarPostagem.dto';
import { IPostagenRepo } from 'src/postagem/models/interfaces/postagenRepo.interface';
import { UsuarioAtualUseCase } from 'src/utils/usuarioAtual/usuarioAtual.use-case';
import { setTimeout } from 'timers/promises';

@Injectable()
export class CriaPostUseCase {
  @Inject('IPostagenRepo')
  private readonly postagenRepo: IPostagenRepo;
  @Inject(DiscontaPostGratuitoUseCase)
  private readonly discontaPostGratuitoUseCase: DiscontaPostGratuitoUseCase;
  @Inject(UsuarioAtualUseCase)
  private readonly usuarioAtualUseCase: UsuarioAtualUseCase;
  @Inject(BuscaUmaPEssoaUseCase)
  private readonly buscaUmaPessoaUseCase: BuscaUmaPEssoaUseCase;

  async execute(param: CriarPostagemDTO, req: Request) {
    param.status = 'Disponivel';
    param.idPessoa = (await this.usuarioAtualUseCase.execute(req)).id;
    const msg = await this.validaPessoaQuatidadePost(param.idPessoa);
    const data = await this.postagenRepo.criar(param);
    return { msg, data };
  }

  private async validaPessoaQuatidadePost(idPessoa: number) {
    const pessoa = await this.buscaUmaPessoaUseCase.execute(idPessoa);
    let res;
    if (pessoa.postGratuito == 0) {
      // aqui vem o metodo de pagamento
      res = await setTimeout(2000, 'Pronto deu tudo certo!!');
    } else {
      await this.discontaPostGratuitoUseCase.execute(idPessoa);
    }
    return res;
  }
}

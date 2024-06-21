import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { DadosCartaoDTO } from 'src/pagamento/models/dto/validaDados.dto';
import { EnviaPagamentoUseCase } from 'src/pagamento/useCases/enviaPagamento/enviaPagamento.use-case';
import { BuscaUmaPEssoaUseCase } from 'src/pessoa/useCases/buscaUmaPessoa/buscaUmaPessoa.use-case';
import { DiscontaPostGratuitoUseCase } from 'src/pessoa/useCases/discontaPost/discontaPost.use-case';
import { CriarPostagemDTO } from 'src/postagem/models/dtos/criarPost.dto';
import { IPostagenRepo } from 'src/postagem/models/interfaces/postagenRepo.interface';
import { UsuarioAtualUseCase } from 'src/utils/usuarioAtual/usuarioAtual.use-case';

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
  @Inject(EnviaPagamentoUseCase)
  private readonly enviaPagamentoUseCase: EnviaPagamentoUseCase;

  async execute(param: CriarPostagemDTO, req: Request) {
    param.status = 'Disponivel';
    const usuarioAtual = await this.usuarioAtualUseCase.execute(req);
    param.idPessoa = usuarioAtual.id;
    param.dadosCartao.nomePessoa = usuarioAtual.nome;
    const msg = await this.validaPessoaQuatidadePost(
      param.idPessoa,
      param.dadosCartao,
    );

    const data = await this.postagenRepo.criar(param);
    return { msg, data };
  }

  private async validaPessoaQuatidadePost(
    idPessoa: number,
    param: DadosCartaoDTO,
  ) {
    const pessoa = await this.buscaUmaPessoaUseCase.execute(idPessoa);
    let res;
    if (pessoa.postGratuito == 0) {
      res = await this.enviaPagamentoUseCase.execute(param);
      if (!res['id']) {
        throw new BadRequestException({
          message: 'Erro, verifique os dados do seu cartão',
        });
      }
    } else {
      await this.discontaPostGratuitoUseCase.execute(idPessoa);
    }
    return res['id'];
  }
}

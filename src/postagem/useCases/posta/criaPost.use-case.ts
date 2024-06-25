import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { BuscaUmEnderecoPessoaUseCase } from 'src/endereco/useCases/buscaUmEnderecoPessoa/buscaUmEnderecoPessoa.use-case';
import { DadosCartaoDTO } from 'src/pagamento/models/dto/dadosCartao.dto';
import { DadosEnderecoDTO } from 'src/pagamento/models/dto/dadosEndereco.dto';
import { EnviaPagamentoUseCase } from 'src/pagamento/useCases/enviaPagamento/enviaPagamento.use-case';
import { BuscaUmaPEssoaUseCase } from 'src/pessoa/useCases/buscaUmaPessoa/buscaUmaPessoa.use-case';
import { DiscontaPostGratuitoUseCase } from 'src/pessoa/useCases/discontaPost/discontaPost.use-case';
import { CriarPostagemDTO } from 'src/postagem/models/dtos/criarPost.dto';
import { IPostagemRepo } from 'src/postagem/models/interfaces/postagemRepo.interface';
import { UsuarioAtualUseCase } from 'src/utils/usuarioAtual/usuarioAtual.use-case';

@Injectable()
export class CriaPostUseCase {
  @Inject('IPostagenRepo')
  private readonly postagenRepo: IPostagemRepo;
  @Inject(DiscontaPostGratuitoUseCase)
  private readonly discontaPostGratuitoUseCase: DiscontaPostGratuitoUseCase;
  @Inject(UsuarioAtualUseCase)
  private readonly usuarioAtualUseCase: UsuarioAtualUseCase;
  @Inject(BuscaUmaPEssoaUseCase)
  private readonly buscaUmaPessoaUseCase: BuscaUmaPEssoaUseCase;
  @Inject(EnviaPagamentoUseCase)
  private readonly enviaPagamentoUseCase: EnviaPagamentoUseCase;
  @Inject(BuscaUmEnderecoPessoaUseCase)
  private readonly buscaUmEnderecoPessoaUseCase: BuscaUmEnderecoPessoaUseCase;

  async execute(param: CriarPostagemDTO, req: Request) {
    let pagamento;
    param.status = 'Disponivel';
    const usuarioAtual = await this.usuarioAtualUseCase.execute(req);
    param.idPessoa = usuarioAtual.id;
    if (param.dadosCartao) {
      param.dadosCartao.nomePessoa = usuarioAtual.nome;
    }

    const quantidadePost = await this.discontaPessoaQuatidadePost(
      param.idPessoa,
    );
    if (quantidadePost <= 0) {
      const endereco = await this.dadosEndereco(param.idPessoa);
      pagamento = await this.discontaValorCartao(param.dadosCartao, endereco);
    }
    const data = await this.postagenRepo.criar(param);
    delete data['dadosCartao'];
    return { pagamento, data };
  }

  private async discontaPessoaQuatidadePost(idPessoa: number) {
    const pessoa = await this.buscaUmaPessoaUseCase.execute(idPessoa);

    if (pessoa.postGratuito != 0) {
      await this.discontaPostGratuitoUseCase.execute(idPessoa);
    }
    return pessoa.postGratuito;
  }

  private async discontaValorCartao(
    cartao: DadosCartaoDTO,
    endereco: DadosEnderecoDTO,
  ) {
    let res;
    res = await this.enviaPagamentoUseCase.execute(cartao, endereco);
    if (!res['id']) {
      throw new BadRequestException({
        message: 'Erro, verifique os dados do seu cartão',
      });
    }
    return res['id'];
  }

  private async dadosEndereco(idPessoa: number) {
    const param: DadosEnderecoDTO = new DadosEnderecoDTO();
    const dadosEndereco =
      await this.buscaUmEnderecoPessoaUseCase.execute(idPessoa);
    param.bairro = dadosEndereco.bairro;
    param.cep = dadosEndereco.cep;
    param.cidade = dadosEndereco.cidade;
    param.complemento = dadosEndereco.complemento;
    param.numero = dadosEndereco.numero;
    param.rua = dadosEndereco.rua;
    param.uf = dadosEndereco.uf;

    return param;
  }
}

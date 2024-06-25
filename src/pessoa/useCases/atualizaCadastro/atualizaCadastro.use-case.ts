import { Inject, Injectable } from '@nestjs/common';
import { AtualizaPessoaDTO } from 'src/pessoa/models/dtos/atualizaPessoa.dto';
import { PessoaEntity } from 'src/pessoa/models/entities/pessoa.entity';
import { IPessoaRepo } from 'src/pessoa/models/interfaces/pessoa.interface';
import { BuscaUmaPEssoaUseCase } from '../buscaUmaPessoa/buscaUmaPessoa.use-case';
import { Request } from 'express';
import { UsuarioAtualUseCase } from 'src/utils/usuarioAtual/usuarioAtual.use-case';

@Injectable()
export class AtualizaCadastroUseCase {
  @Inject('IPessoaRepo')
  private readonly pessoaRepo: IPessoaRepo;
  @Inject(BuscaUmaPEssoaUseCase)
  private readonly buscaUmaPessoaUseCase: BuscaUmaPEssoaUseCase;
  @Inject(UsuarioAtualUseCase)
  private readonly usuarioAtualUseCase: UsuarioAtualUseCase;

  async execute(req: Request, param: AtualizaPessoaDTO) {
    const idPessoa = (await this.usuarioAtualUseCase.execute(req)).id;
    const pessoaCadastro = await this.buscaUmaPessoaUseCase.execute(idPessoa);
    param.nome = pessoaCadastro.nome;
    const pessoa = new PessoaEntity(param);
    await this.pessoaRepo.atualizar(idPessoa, pessoa);

    return pessoaCadastro;
  }
}

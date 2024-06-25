import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { BuscaUmaPEssoaUseCase } from 'src/pessoa/useCases/buscaUmaPessoa/buscaUmaPessoa.use-case';
import { AtualizaPostDTO } from 'src/postagem/models/dtos/atualizaPost.dto';
import { IPostagemRepo } from 'src/postagem/models/interfaces/postagemRepo.interface';
import { PegaUmPostUseCase } from '../pegaUmPost/pegaUmPoste.use-case';
import { Request } from 'express';
import { UsuarioAtualUseCase } from 'src/utils/usuarioAtual/usuarioAtual.use-case';

@Injectable()
export class AtualizaPostUseCase {
  @Inject('IPostagenRepo')
  private readonly postagenRepo: IPostagemRepo;
  @Inject(PegaUmPostUseCase)
  private readonly buscaUmaPostePessoaUseCase: PegaUmPostUseCase;
  @Inject(UsuarioAtualUseCase)
  private readonly usuarioAtualUseCase: UsuarioAtualUseCase;

  async execute(id: number, param: AtualizaPostDTO, req: Request) {
    const idPessoa = (await this.usuarioAtualUseCase.execute(req)).id;
    const postagem = await this.buscaUmaPostePessoaUseCase.execute(id);
    if (idPessoa != postagem.idPessoa) {
      throw new UnauthorizedException();
    }
    if (!postagem) {
      throw new BadRequestException({ message: 'Post não encontrado' });
    }
    await this.postagenRepo.atualizar(id, param);
  }
}

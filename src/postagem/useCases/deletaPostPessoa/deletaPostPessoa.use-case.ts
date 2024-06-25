import {
  HttpException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { IPostagenRepo } from 'src/postagem/models/interfaces/postagenRepo.interface';
import { PegaUmPosteUseCase } from '../pegaUmPost/pegaUmPoste.use-case';
import { DeletaPostDTO } from 'src/postagem/models/dtos/deletaPost.dto';
import { DeletaMidiaUseCase } from 'src/midia/usueCases/deletaMidia/deletaMidia.use-case';
import { Request } from 'express';
import { UsuarioAtualUseCase } from 'src/utils/usuarioAtual/usuarioAtual.use-case';

@Injectable()
export class DeletaPostePessoaUseCase {
  @Inject('IPostagenRepo')
  private readonly postagemRepo: IPostagenRepo;
  @Inject(PegaUmPosteUseCase)
  private readonly pegaUmPostePessoaUseCase: PegaUmPosteUseCase;
  @Inject(DeletaMidiaUseCase)
  private readonly deletaMidiaUseCase: DeletaMidiaUseCase;
  @Inject(UsuarioAtualUseCase)
  private readonly usuarioAtualUseCase: UsuarioAtualUseCase;

  async execute({ id }: DeletaPostDTO, req: Request) {
    try {
      const post = await this.pegaUmPostePessoaUseCase.execute(id);
      const idPessoa = (await this.usuarioAtualUseCase.execute(req)).id;
      if (post.idPessoa == idPessoa) {
        await this.deletaMidiaUseCase.execute(post.id);
        return await this.postagemRepo.deletaPost(post);
      } else {
        throw new UnauthorizedException();
      }
    } catch (e) {
      throw new HttpException(
        e.response ?? 'Erro ao tentar deletar post',
        e.status ?? 400,
      );
    }
  }
}

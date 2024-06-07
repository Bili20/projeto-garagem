import {
  HttpException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { IPostagenRepo } from 'src/postagem/models/interfaces/postagenRepo.interface';
import { PegaUmPostePessoaUseCase } from '../pegaUmpostePessoa/pegaUmPostePessoa.use-case';
import { DeletaPostDTO } from 'src/postagem/models/dtos/deletaPoste.dto';
import { DeletaMidiaUseCase } from 'src/midia/usueCases/deletaMidia/deletaMidia.use-case';

@Injectable()
export class DeletaPostePessoaUseCase {
  @Inject('IPostagenRepo')
  private readonly postagemRepo: IPostagenRepo;
  @Inject(PegaUmPostePessoaUseCase)
  private readonly pegaUmPostePessoaUseCase: PegaUmPostePessoaUseCase;
  @Inject(DeletaMidiaUseCase)
  private readonly deletaMidiaUseCase: DeletaMidiaUseCase;

  async execute({ id, idPessoa }: DeletaPostDTO) {
    try {
      const post = await this.pegaUmPostePessoaUseCase.execute(id);

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

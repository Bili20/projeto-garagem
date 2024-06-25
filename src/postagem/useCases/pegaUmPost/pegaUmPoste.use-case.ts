import {
  BadRequestException,
  HttpException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { IPostagemRepo } from 'src/postagem/models/interfaces/postagemRepo.interface';
import { URLIMAGE } from 'src/utils/constants/constants';

@Injectable()
export class PegaUmPostUseCase {
  @Inject('IPostagenRepo')
  private readonly postagenRepo: IPostagemRepo;

  async execute(id: number) {
    try {
      const post = await this.postagenRepo.buscaUmPost(id);
      if (!post) {
        throw new BadRequestException({ message: 'Postagem não encontrada' });
      }
      for (const midia of post.midia) {
        midia.nome = URLIMAGE + '/files/posts/' + midia.nome;
      }
      delete post.pessoa.senha;
      delete post.pessoa.documento;
      return post;
    } catch (e) {
      throw new HttpException(
        e.response ?? 'Erro ao tenatr procurar post',
        e.status ?? 400,
      );
    }
  }
}

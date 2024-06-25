import {
  BadRequestException,
  HttpException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { IPostagenRepo } from 'src/postagem/models/interfaces/postagenRepo.interface';
import { URLIMAGE } from 'src/utils/constants/constants';

@Injectable()
export class PegaUmPosteUseCase {
  @Inject('IPostagenRepo')
  private readonly postagenRepo: IPostagenRepo;

  async execute(id: number) {
    try {
      const post = await this.postagenRepo.buscaUmPoste(id);
      if (!post) {
        throw new BadRequestException({ message: 'Postagem não encontrada' });
      }
      for (const midia of post.midia) {
        midia.nome = URLIMAGE + '/files/posts/' + midia.nome;
      }
      return post;
    } catch (e) {
      throw new HttpException(
        e.response ?? 'Erro ao tenatr procurar post',
        e.status ?? 400,
      );
    }
  }
}

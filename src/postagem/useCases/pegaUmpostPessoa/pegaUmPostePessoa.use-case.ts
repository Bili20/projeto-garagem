import {
  BadRequestException,
  HttpException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { IPostagenRepo } from 'src/postagem/models/interfaces/postagenRepo.interface';

@Injectable()
export class BuscaUmPostePessoaUseCase {
  @Inject('IPostagenRepo')
  private readonly postagenRepo: IPostagenRepo;

  async execute(id: number) {
    try {
      const post = await this.postagenRepo.buscaUmPoste(id);
      if (!post) {
        throw new BadRequestException({ message: 'Postagem não encontrada' });
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

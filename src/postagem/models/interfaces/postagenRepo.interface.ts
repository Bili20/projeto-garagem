import { CriarPostagemDTO } from '../dtos/criarPostagen.dto';
import { PostagemEntity } from '../entites/postagem.entity';

export interface IPostagenRepo {
  criar(param: CriarPostagemDTO): Promise<PostagemEntity>;
}

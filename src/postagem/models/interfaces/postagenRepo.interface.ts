import { CriarPostagenDTO } from '../dtos/criarPostagen.dto';
import { PostagenEntity } from '../entites/postagen.entity';

export interface IPostagenRepo {
  criar(param: CriarPostagenDTO): Promise<PostagenEntity>;
}

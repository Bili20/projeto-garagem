import { CriarPostagemDTO } from '../dtos/criarPostagem.dto';
import { PegaPostesDTO } from '../dtos/pegaPostes.dto';
import { PostagemEntity } from '../entites/postagem.entity';

export interface IPostagenRepo {
  criar(param: CriarPostagemDTO): Promise<PostagemEntity>;
  postesPessoa(idPessoa: number): Promise<PostagemEntity[]>;
  postes(params: PegaPostesDTO): Promise<PostagemEntity[]>;
  umPoste(id: number): Promise<PostagemEntity>;
  deletaPost(param: PostagemEntity): Promise<void>;
}

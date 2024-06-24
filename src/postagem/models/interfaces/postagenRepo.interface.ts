import { AtualizaPostDTO } from '../dtos/atualizaPost.dto';
import { CriarPostagemDTO } from '../dtos/criarPost.dto';
import { PegaPostesDTO } from '../dtos/pegaPost.dto';
import { PostagemEntity } from '../entites/postagem.entity';

export interface IPostagenRepo {
  criar(param: CriarPostagemDTO): Promise<PostagemEntity>;
  postesPessoa(idPessoa: number): Promise<PostagemEntity[]>;
  buscaPostes(params: PegaPostesDTO): Promise<PostagemEntity[]>;
  buscaUmPoste(id: number): Promise<PostagemEntity>;
  deletaPost(param: PostagemEntity): Promise<void>;
  atualizar(id: number, param: AtualizaPostDTO): Promise<void>;
}

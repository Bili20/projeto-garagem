import { AtualizaPostDTO } from '../dtos/atualizaPost.dto';
import { CriarPostagemDTO } from '../dtos/criarPost.dto';
import { PegaPostesDTO } from '../dtos/pegaPost.dto';
import { PostagemEntity } from '../entites/postagem.entity';

export interface IPostagemRepo {
  criar(param: CriarPostagemDTO): Promise<PostagemEntity>;
  postsPessoa(idPessoa: number): Promise<PostagemEntity[]>;
  buscaPosts(params: PegaPostesDTO): Promise<PostagemEntity[]>;
  buscaUmPost(id: number): Promise<PostagemEntity>;
  deletaPost(param: PostagemEntity): Promise<void>;
  atualizar(id: number, param: AtualizaPostDTO): Promise<void>;
}

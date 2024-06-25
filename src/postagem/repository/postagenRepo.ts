import { Injectable } from '@nestjs/common';
import { IPostagenRepo } from '../models/interfaces/postagenRepo.interface';
import { CriarPostagemDTO } from '../models/dtos/criarPost.dto';
import { PostagemEntity } from '../models/entites/postagem.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PegaPostesDTO } from '../models/dtos/pegaPost.dto';
import { AtualizaPostDTO } from '../models/dtos/atualizaPost.dto';

@Injectable()
export class PostagenRepo implements IPostagenRepo {
  constructor(
    @InjectRepository(PostagemEntity)
    private readonly postagemRepo: Repository<PostagemEntity>,
  ) {}
  async criar(param: CriarPostagemDTO): Promise<PostagemEntity> {
    return await this.postagemRepo.save(param);
  }

  async postesPessoa(idPessoa: number): Promise<PostagemEntity[]> {
    return await this.postagemRepo.find({
      where: { idPessoa: idPessoa },
      relations: { midia: true },
    });
  }

  async buscaPostes(params: PegaPostesDTO): Promise<PostagemEntity[]> {
    return await this.postagemRepo
      .createQueryBuilder('post')
      .select([
        'post.id',
        'post.titulo',
        'post.descricao',
        'post.valor',
        'post.anuncio',
        'post.dataCadastro',
        'post.status',
        'post.idPessoa',
      ])
      .addSelect(['pessoa.nome'])
      .addSelect(['midia.nome'])
      .innerJoin('post.pessoa', 'pessoa')
      .innerJoin('post.midia', 'midia')
      .orderBy('post.dataCadastro', 'DESC')
      .take(params.quantidade)
      .skip((params.pagina - 1) * params.quantidade)
      .getMany();
  }

  async buscaUmPoste(id: number): Promise<PostagemEntity> {
    return this.postagemRepo.findOne({
      where: { id: id },
      relations: { midia: true },
    });
  }

  async deletaPost(param: PostagemEntity): Promise<void> {
    await this.postagemRepo.delete(param.id);
  }

  async atualizar(id: number, param: AtualizaPostDTO): Promise<void> {
    await this.postagemRepo.update(id, param);
  }
}

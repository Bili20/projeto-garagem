import { Injectable } from '@nestjs/common';
import { IPostagenRepo } from '../models/interfaces/postagenRepo.interface';
import { CriarPostagemDTO } from '../models/dtos/criarPostagem.dto';
import { PostagemEntity } from '../models/entites/postagem.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PegaPostesDTO } from '../models/dtos/pegaPostes.dto';

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

  async postes(params: PegaPostesDTO): Promise<PostagemEntity[]> {
    return this.postagemRepo
      .createQueryBuilder('post')
      .orderBy('post.dataCadastro', 'DESC')
      .take(params.quantidade)
      .skip((params.pagina - 1) * params.quantidade)
      .getMany();
  }

  async umPoste(id: number): Promise<PostagemEntity> {
    return this.postagemRepo.findOne({ where: { id: id } });
  }

  async deletaPost(param: PostagemEntity): Promise<void> {
    await this.postagemRepo.delete(param.id);
  }
}

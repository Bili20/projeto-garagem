import { Injectable } from '@nestjs/common';
import { IPostagenRepo } from '../models/interfaces/postagenRepo.interface';
import { CriarPostagemDTO } from '../models/dtos/criarPostagen.dto';
import { PostagemEntity } from '../models/entites/postagem.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PostagenRepo implements IPostagenRepo {
  constructor(
    @InjectRepository(PostagemEntity)
    private readonly postagenRepo: Repository<PostagemEntity>,
  ) {}
  async criar(param: CriarPostagemDTO): Promise<PostagemEntity> {
    return await this.postagenRepo.save(param);
  }
}

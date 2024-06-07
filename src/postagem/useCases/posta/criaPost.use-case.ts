import { Inject, Injectable } from '@nestjs/common';
import { CriarPostagemDTO } from 'src/postagem/models/dtos/criarPostagen.dto';
import { IPostagenRepo } from 'src/postagem/models/interfaces/postagenRepo.interface';

@Injectable()
export class CriaPostUseCase {
  @Inject('IPostagenRepo')
  private readonly postagenRepo: IPostagenRepo;

  async execute(param: CriarPostagemDTO) {
    param.status = 'Disponivel';
    param.idPessoa = param.idPessoa;
    return this.postagenRepo.criar(param);
  }
}

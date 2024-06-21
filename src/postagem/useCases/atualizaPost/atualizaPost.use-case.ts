import { Inject, Injectable } from '@nestjs/common';
import { IPostagenRepo } from 'src/postagem/models/interfaces/postagenRepo.interface';

@Injectable()
export class AtualizaPostUseCase {
  @Inject('IPostagenRepo')
  private readonly postagenRepo: IPostagenRepo;

  async execute() {}
}

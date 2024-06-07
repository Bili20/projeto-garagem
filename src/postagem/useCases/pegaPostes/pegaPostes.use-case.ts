import { Inject, Injectable } from '@nestjs/common';
import { PegaPostesDTO } from 'src/postagem/models/dtos/pegaPostes.dto';
import { IPostagenRepo } from 'src/postagem/models/interfaces/postagenRepo.interface';

@Injectable()
export class PegaPostesUseCase {
  @Inject('IPostagenRepo')
  private readonly postagenRepo: IPostagenRepo;

  async execute({ pagina = 1, quantidade = 10 }: PegaPostesDTO) {
    return this.postagenRepo.postes({ pagina, quantidade });
  }
}

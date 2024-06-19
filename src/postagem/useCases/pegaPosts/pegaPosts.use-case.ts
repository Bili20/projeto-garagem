import { Inject, Injectable } from '@nestjs/common';
import { URLIMAGE } from 'src/constants/constants';
import { PegaPostesDTO } from 'src/postagem/models/dtos/pegaPostes.dto';
import { IPostagenRepo } from 'src/postagem/models/interfaces/postagenRepo.interface';

@Injectable()
export class PegaPostesUseCase {
  @Inject('IPostagenRepo')
  private readonly postagenRepo: IPostagenRepo;

  async execute({ pagina = 1, quantidade = 10 }: PegaPostesDTO) {
    const datas = await this.postagenRepo.postes({ pagina, quantidade });
    for (const data of datas) {
      for (const midia of data.midia) {
        midia.nome = URLIMAGE + '/files/posts/' + midia.nome;
      }
    }
    return datas;
  }
}

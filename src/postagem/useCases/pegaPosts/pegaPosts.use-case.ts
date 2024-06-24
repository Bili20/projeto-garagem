import { Inject, Injectable } from '@nestjs/common';
import { URLIMAGE } from 'src/utils/constants/constants';
import { PegaPostesDTO } from 'src/postagem/models/dtos/pegaPost.dto';
import { IPostagenRepo } from 'src/postagem/models/interfaces/postagenRepo.interface';

@Injectable()
export class PegaPostesUseCase {
  @Inject('IPostagenRepo')
  private readonly postagenRepo: IPostagenRepo;

  async execute({ pagina = 1, quantidade = 10 }: PegaPostesDTO) {
    try {
      const datas = await this.postagenRepo.buscaPostes({ pagina, quantidade });
      for (const data of datas) {
        for (const midia of data.midia) {
          midia.nome = URLIMAGE + '/files/posts/' + midia.nome;
        }
      }
      return datas;
    } catch (e) {
      console.log(e);
    }
  }
}

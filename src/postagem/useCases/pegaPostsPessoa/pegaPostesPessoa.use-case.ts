import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { URLIMAGE } from 'src/constants/constants';
import { IPostagenRepo } from 'src/postagem/models/interfaces/postagenRepo.interface';

@Injectable()
export class PegarPostesPessoaUseCase {
  @Inject('IPostagenRepo')
  private readonly postagenRepo: IPostagenRepo;

  async execute(idPessoa: number) {
    try {
      const datas = await this.postagenRepo.postesPessoa(idPessoa);
      for (const data of datas) {
        for (const midia of data.midia) {
          midia.nome = URLIMAGE + '/files/posts/' + midia.nome;
        }
      }
      return datas;
    } catch (e) {
      throw new BadRequestException({
        message: 'Erro ao pegar postes do usuário',
      });
    }
  }
}

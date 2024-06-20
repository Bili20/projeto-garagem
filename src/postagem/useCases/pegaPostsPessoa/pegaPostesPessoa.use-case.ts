import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { URLIMAGE } from 'src/constants/constants';
import { IPostagenRepo } from 'src/postagem/models/interfaces/postagenRepo.interface';
import { UsuarioAtualUseCase } from 'src/utils/usuarioAtual/usuarioAtual.use-case';

@Injectable()
export class PegarPostesPessoaUseCase {
  @Inject('IPostagenRepo')
  private readonly postagenRepo: IPostagenRepo;
  @Inject(UsuarioAtualUseCase)
  private readonly usuarioAtualUseCase: UsuarioAtualUseCase;

  async execute(req: Request) {
    try {
      const idPessoa = (await this.usuarioAtualUseCase.execute(req)).id;
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

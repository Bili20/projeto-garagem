import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { URLIMAGE } from 'src/utils/constants/constants';
import { IPostagemRepo } from 'src/postagem/models/interfaces/postagemRepo.interface';
import { UsuarioAtualUseCase } from 'src/utils/usuarioAtual/usuarioAtual.use-case';

@Injectable()
export class PegarPostsPessoaUseCase {
  @Inject('IPostagenRepo')
  private readonly postagenRepo: IPostagemRepo;
  @Inject(UsuarioAtualUseCase)
  private readonly usuarioAtualUseCase: UsuarioAtualUseCase;

  async execute(req: Request) {
    try {
      const idPessoa = (await this.usuarioAtualUseCase.execute(req)).id;
      const datas = await this.postagenRepo.postsPessoa(idPessoa);
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

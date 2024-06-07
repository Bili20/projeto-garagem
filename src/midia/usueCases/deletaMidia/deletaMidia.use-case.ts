import { Inject, Injectable } from '@nestjs/common';
import { existsSync, unlinkSync } from 'fs';
import { IMidiaRepo } from 'src/midia/models/interfaces/midiaRepo.interface';

@Injectable()
export class DeletaMidiaUseCase {
  @Inject('IMidiaRepo')
  private readonly midiaRepo: IMidiaRepo;

  async execute(idPostagem: number) {
    const datas = await this.midiaRepo.buscaMidias(idPostagem);
    for (const data of datas) {
      if (existsSync('files/posts/' + data.nome)) {
        unlinkSync('files/posts/' + data.nome);
      }
      await this.midiaRepo.deletar(data);
    }
  }
}

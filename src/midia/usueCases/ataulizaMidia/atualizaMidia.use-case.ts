import { Inject, Injectable } from '@nestjs/common';
import { existsSync, unlinkSync } from 'fs';
import { AtualizaMidiaDTO } from 'src/midia/models/dtos/atualizaMidia.dto';
import { MidiaEntity } from 'src/midia/models/entities/midia.entity';
import { IMidiaRepo } from 'src/midia/models/interfaces/midiaRepo.interface';

@Injectable()
export class AtualizaMidiaUseCase {
  @Inject('IMidiaRepo')
  private readonly midiaRepo: IMidiaRepo;

  async execute(id: number, param: AtualizaMidiaDTO) {
    const newMidia = new MidiaEntity(param);
    if (!id) {
      return await this.midiaRepo.salvar(newMidia);
    }
    const midia = await this.midiaRepo.buscaUm(id);
    if (existsSync('files/perfil/' + midia.nome)) {
      unlinkSync('files/perfil/' + midia.nome);
    }

    return await this.midiaRepo.atualizar(id, newMidia);
  }
}

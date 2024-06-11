import { Inject, Injectable } from '@nestjs/common';
import { SalvarMidiaPerfilDTO } from 'src/midia/models/dtos/salvarMidiaPerfil.dto';
import { MidiaEntity } from 'src/midia/models/entities/midia.entity';
import { IMidiaRepo } from 'src/midia/models/interfaces/midiaRepo.interface';

@Injectable()
export class SalvarMidiaPerfilUseCase {
  @Inject('IMidiaRepo')
  private readonly midiaRepo: IMidiaRepo;

  async execute(param: SalvarMidiaPerfilDTO) {
    const midia = new MidiaEntity(param);
    return this.midiaRepo.salvar(midia);
  }
}

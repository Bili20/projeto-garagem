import { Inject, Injectable } from '@nestjs/common';
import { IMidiaRepo } from 'src/midia/models/interfaces/midiaRepo.interface';
import { SalvarMidiaDTO } from 'src/midia/models/dtos/salvarMidia.dto';

@Injectable()
export class SalvarMidiaUsecase {
  @Inject('IMidiaRepo')
  private readonly midiaRepo: IMidiaRepo;

  async execute(param: SalvarMidiaDTO) {
    return this.midiaRepo.salvar(param);
  }
}

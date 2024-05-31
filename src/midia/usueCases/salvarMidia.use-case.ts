import { Inject, Injectable } from '@nestjs/common';
import { IMidiaRepo } from '../models/interfaces/midiaRepo.interface';
import { SalvarMidiaDTO } from '../models/dtos/salvarMidia.dto';

@Injectable()
export class SalvarMidiaUsecase {
  @Inject('IMidiaRepo')
  private readonly midiaRepo: IMidiaRepo;

  async execute(param: SalvarMidiaDTO) {
    return this.midiaRepo.salvar(param);
  }
}

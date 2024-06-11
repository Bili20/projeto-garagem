import { Inject, Injectable } from '@nestjs/common';
import { IMidiaRepo } from 'src/midia/models/interfaces/midiaRepo.interface';
import { SalvarMidiaPostDTO } from 'src/midia/models/dtos/salvarMidiaPost.dto';
import { MidiaEntity } from 'src/midia/models/entities/midia.entity';

@Injectable()
export class SalvarMidiaPostUsecase {
  @Inject('IMidiaRepo')
  private readonly midiaRepo: IMidiaRepo;

  async execute(param: SalvarMidiaPostDTO) {
    const midia = new MidiaEntity(param);
    return this.midiaRepo.salvar(midia);
  }
}

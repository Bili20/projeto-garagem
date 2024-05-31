import { Injectable } from '@nestjs/common';
import { IMidiaRepo } from '../models/interfaces/midiaRepo.interface';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { MidiaEntity } from '../models/entities/midia.entity';
import { SalvarMidiaDTO } from '../models/dtos/salvarMidia.dto';

@Injectable()
export class MidiaRepo implements IMidiaRepo {
  constructor(
    @InjectRepository(MidiaEntity)
    private readonly midiaRepo: Repository<MidiaEntity>,
  ) {}

  async salvar(param: SalvarMidiaDTO): Promise<void> {
    await this.midiaRepo.save(param);
  }
}

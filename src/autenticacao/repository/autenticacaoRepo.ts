import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PessoaEntity } from 'src/pessoa/models/entities/pessoa.entity';
import { Repository } from 'typeorm';
import { IAutenticacaoRepo } from '../models/interfaces/autenticacaoRepo.interface';
import { LoginDTO } from '../models/dtos/login.dto';

@Injectable()
export class AutenticacaoRepo implements IAutenticacaoRepo {
  constructor(
    @InjectRepository(PessoaEntity)
    private readonly pessoaRepo: Repository<PessoaEntity>,
  ) {}

  async buscaPorEmail(email: string): Promise<PessoaEntity> {
    const pessoa = await this.pessoaRepo.findOne({ where: { email: email } });
    return pessoa;
  }
}

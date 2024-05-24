import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PessoaCadastroDTO } from 'src/pessoa/models/dtos/pessoaCadastro.dto';
import { PessoaEntity } from 'src/pessoa/models/entities/pessoa.entity';
import { IPessoaRepo } from 'src/pessoa/models/interfaces/pessoa.interface';
import { Repository } from 'typeorm';

@Injectable()
export class PessoaRepo implements IPessoaRepo {
  constructor(
    @InjectRepository(PessoaEntity)
    private readonly pessoaRepo: Repository<PessoaEntity>,
  ) {}
  async cadastrar(param: PessoaCadastroDTO): Promise<void> {
    const pessoa = new PessoaEntity(param);
    await this.pessoaRepo.save(pessoa);
  }

  async buscarPessoas(): Promise<PessoaEntity[]> {
    return await this.pessoaRepo.find({
      select: ['id', 'email', 'documento', 'email', 'sexo', 'dataNacimento'],
    });
  }

  async buscarUmaPessoa(id: number): Promise<PessoaEntity> {
    return await this.pessoaRepo.findOne({ where: { id: id } });
  }
}

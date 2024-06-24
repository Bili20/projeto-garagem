import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CadastroEnderecoDTO } from 'src/endereco/models/dto/cadastroEndereco.dto';
import { EnderecoEntity } from 'src/endereco/models/entities/endedreco.entity';
import { IEnderecoRepo } from 'src/endereco/models/interfaces/enderecoRepo.interface';
import { Repository } from 'typeorm';

@Injectable()
export class EnderecoRepo implements IEnderecoRepo {
  constructor(
    @InjectRepository(EnderecoEntity)
    private readonly enderecoRepo: Repository<EnderecoEntity>,
  ) {}

  async cadastrar(param: CadastroEnderecoDTO): Promise<void> {
    await this.enderecoRepo.save(param);
  }

  async buscaUmEndereco(idPEssoa: number): Promise<EnderecoEntity> {
    return this.enderecoRepo.findOne({ where: { idPessoa: idPEssoa } });
  }
}

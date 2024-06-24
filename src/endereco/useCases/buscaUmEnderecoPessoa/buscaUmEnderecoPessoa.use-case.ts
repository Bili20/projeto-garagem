import { Inject, Injectable } from '@nestjs/common';
import { IEnderecoRepo } from 'src/endereco/models/interfaces/enderecoRepo.interface';

@Injectable()
export class BuscaUmEnderecoPessoaUseCase {
  @Inject('IEnderecoRepo')
  private readonly enderecoRepo: IEnderecoRepo;

  async execute(idPessoa: number) {
    return await this.enderecoRepo.buscaUmEndereco(idPessoa);
  }
}

import { Inject, Injectable } from '@nestjs/common';
import { PessoaCadastroDTO } from 'src/pessoa/models/dtos/pessoaCadastro.dto';
import { IPessoaRepo } from 'src/pessoa/models/interfaces/pessoa.interface';

@Injectable()
export class PessoaCadastroUsecase {
  @Inject('IPessoaRepo')
  private readonly pessoaRepo: IPessoaRepo;

  async execute(param: PessoaCadastroDTO) {
    return this.pessoaRepo.cadastrar(param);
  }
}

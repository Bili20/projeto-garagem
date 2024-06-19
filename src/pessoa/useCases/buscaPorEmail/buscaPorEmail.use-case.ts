import { Inject, Injectable } from '@nestjs/common';
import { IPessoaRepo } from 'src/pessoa/models/interfaces/pessoa.interface';

@Injectable()
export class BuscaPorEmailUseCase {
  @Inject('IPessoaRepo')
  private readonly pessoaRepo: IPessoaRepo;

  async execute(email: string) {
    return await this.pessoaRepo.buscaporEmail(email);
  }
}

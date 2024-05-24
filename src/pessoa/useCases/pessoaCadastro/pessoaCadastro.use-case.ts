import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { PessoaCadastroDTO } from 'src/pessoa/models/dtos/pessoaCadastro.dto';
import { IPessoaRepo } from 'src/pessoa/models/interfaces/pessoa.interface';
import * as bcrypt from 'bcrypt';
@Injectable()
export class PessoaCadastroUsecase {
  @Inject('IPessoaRepo')
  private readonly pessoaRepo: IPessoaRepo;

  async execute(param: PessoaCadastroDTO) {
    if (param.senha.length <= 4) {
      throw new BadRequestException({
        message: 'informe uma senha com no minimo 5 caracteres',
      });
    }
    param.senha = await bcrypt.hash(param.senha, 10);
    return this.pessoaRepo.cadastrar(param);
  }
}

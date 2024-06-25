import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { PessoaCadastroDTO } from 'src/pessoa/models/dtos/pessoaCadastro.dto';
import { IPessoaRepo } from 'src/pessoa/models/interfaces/pessoa.interface';
import * as bcrypt from 'bcrypt';
import { isCNPJ, isCPF } from 'validation-br';
@Injectable()
export class PessoaCadastroUsecase {
  @Inject('IPessoaRepo')
  private readonly pessoaRepo: IPessoaRepo;

  async execute(param: PessoaCadastroDTO) {
    this.validaDocumento(param.documento);
    this.validaTelefone(param.telefone);
    this.validaSenha(param.senha);
    param.senha = await bcrypt.hash(param.senha, 10);
    return this.pessoaRepo.cadastrar(param);
  }

  private validaSenha(senha: string) {
    if (senha.length <= 4) {
      throw new BadRequestException({
        message: 'Informe uma senha com no minimo 5 caracteres',
      });
    }
  }

  private validaTelefone(telefone: string) {
    if (telefone.length > 11 || telefone.length < 10) {
      throw new BadRequestException({ message: 'Informe um telefone valido.' });
    }
  }

  private validaDocumento(documento: string) {
    if (documento.length > 11) {
      const cnpj = isCNPJ(documento);
      if (!cnpj) {
        throw new BadRequestException({
          message: 'Informe um documento valido',
        });
      }
    } else {
      const cpf = isCPF(documento);
      if (!cpf) {
        throw new BadRequestException({
          message: 'Informe um documento valido',
        });
      }
    }
  }
}

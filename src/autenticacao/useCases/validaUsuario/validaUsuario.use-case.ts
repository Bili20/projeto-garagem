import { Inject, Injectable } from '@nestjs/common';
import { IAutenticacaoRepo } from '../../models/interfaces/autenticacaoRepo.interface';
import { LoginDTO } from '../../models/dtos/login.dto';
const bcrypt = require('bcrypt');

@Injectable()
export class ValidaUsuarioUseCase {
  @Inject('IAutenticacaoRepo')
  private readonly AutenticacaoRepo: IAutenticacaoRepo;

  async execute({ email, senha }: LoginDTO) {
    const pessoa = await this.AutenticacaoRepo.buscaPorEmail(email);
    const decrypt = bcrypt.compareSync(senha, pessoa.senha);
    if (decrypt) {
      return pessoa;
    }
    return null;
  }
}

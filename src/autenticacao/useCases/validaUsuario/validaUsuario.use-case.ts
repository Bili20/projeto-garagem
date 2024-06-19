import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { IAutenticacaoRepo } from '../../models/interfaces/autenticacaoRepo.interface';
import { LoginDTO } from '../../models/dtos/login.dto';
const bcrypt = require('bcrypt');

@Injectable()
export class ValidaUsuarioUseCase {
  @Inject('IAutenticacaoRepo')
  private readonly AutenticacaoRepo: IAutenticacaoRepo;

  async execute({ email, senha }: LoginDTO) {
    let decrypt;
    const pessoa = await this.AutenticacaoRepo.buscaPorEmail(email);
    if (pessoa) {
      decrypt = bcrypt.compareSync(senha, pessoa.senha);
    }
    if (decrypt) {
      return pessoa;
    }
    throw new UnauthorizedException({ messgae: 'email ou senha incorreto' });
  }
}

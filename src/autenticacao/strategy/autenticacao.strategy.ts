import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { IAutenticacaoRepo } from '../models/interfaces/autenticacaoRepo.interface';
import { ValidaUsuarioUseCase } from '../useCases/validaUsuario/validaUsuario.use-case';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(
    @Inject(ValidaUsuarioUseCase)
    private readonly validaUsuarioUseCase: ValidaUsuarioUseCase,
  ) {
    super({
      usernameField: 'email',
      passwordField: 'senha',
    });
  }

  async valida(email: string, senha: string): Promise<any> {
    const usuario = await this.validaUsuarioUseCase.execute({ email, senha });
  }
}

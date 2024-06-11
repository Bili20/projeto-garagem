import { Inject, Injectable } from '@nestjs/common';
import { LoginDTO } from 'src/autenticacao/models/dtos/login.dto';
import { IAutenticacaoRepo } from 'src/autenticacao/models/interfaces/autenticacaoRepo.interface';
import { ValidaUsuarioUseCase } from '../validaUsuario/validaUsuario.use-case';

@Injectable()
export class LoginUseCase {
  @Inject('IAutenticacaoRepo')
  private readonly AutenticacaoRepo: IAutenticacaoRepo;
  @Inject(ValidaUsuarioUseCase)
  private readonly validaUsuarioUsecase: ValidaUsuarioUseCase;

  async execute({ email, senha }: LoginDTO) {}
}

import { HttpException, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDTO } from 'src/autenticacao/models/dtos/login.dto';
import { BuscaPorEmailUseCase } from 'src/pessoa/useCases/buscaPorEmail/buscaPorEmail.use-case';
import { ValidaUsuarioUseCase } from '../validaUsuario/validaUsuario.use-case';

@Injectable()
export class LoginUseCase {
  @Inject(ValidaUsuarioUseCase)
  private readonly validaUsuarioUseCase: ValidaUsuarioUseCase;
  @Inject(JwtService)
  private jwtService: JwtService;

  async execute(param: LoginDTO) {
    try {
      const user = await this.validaUsuarioUseCase.execute(param);

      if (user) {
        const payload = { sub: user.id, nome: user.nome };
        return {
          access: this.jwtService.sign(payload),
        };
      }
    } catch (e) {
      throw new HttpException(e.response, e.status);
    }
  }
}

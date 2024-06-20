import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IUsuarioAtual } from '../models/interfaces/usuarioAtual.interface';
import { Request } from 'express';

@Injectable()
export class UsuarioAtualUseCase {
  @Inject(JwtService)
  private jwtService: JwtService;

  async execute(req: Request): Promise<IUsuarioAtual> {
    const access = req.headers['authorization'];
    const dadosUser = this.jwtService.decode(access.replace('Bearer ', ''));
    const user = {} as IUsuarioAtual;
    user.id = dadosUser.sub;
    user.nome = dadosUser.nome;
    return user;
  }
}

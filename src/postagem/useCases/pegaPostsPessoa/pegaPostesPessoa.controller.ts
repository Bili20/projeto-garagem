import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PegarPostesPessoaUseCase } from './pegaPostesPessoa.use-case';
import { JwtAuthGuard } from 'src/autenticacao/guards/jwt.guard';
import { Request } from 'express';

@Controller('pegar/posts/pessoa')
export class PegarPostesPessoaController {
  @Inject(PegarPostesPessoaUseCase)
  private readonly pegarPostesPessoaUseCase: PegarPostesPessoaUseCase;

  @UseGuards(JwtAuthGuard)
  @Get()
  pegarPostes(@Req() req: Request) {
    return this.pegarPostesPessoaUseCase.execute(req);
  }
}

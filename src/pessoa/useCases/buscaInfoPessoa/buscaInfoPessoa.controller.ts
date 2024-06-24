import { Controller, Get, Inject, Req, UseGuards } from '@nestjs/common';
import { BuscaInfoPessoaUseCase } from './buscaInfoPessoa.use-case';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/autenticacao/guards/jwt.guard';

@Controller('informacoes/pessoa')
export class BuscaInfoPessoaController {
  @Inject(BuscaInfoPessoaUseCase)
  private readonly buscaInfoPessoaUseCase: BuscaInfoPessoaUseCase;

  @UseGuards(JwtAuthGuard)
  @Get()
  buscaInfo(@Req() req: Request) {
    return this.buscaInfoPessoaUseCase.execute(req);
  }
}

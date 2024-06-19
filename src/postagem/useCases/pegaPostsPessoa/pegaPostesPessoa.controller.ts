import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  UseGuards,
} from '@nestjs/common';
import { PegarPostesPessoaUseCase } from './pegaPostesPessoa.use-case';
import { JwtAuthGuard } from 'src/autenticacao/guards/jwt.guard';

@Controller('pegar/posts')
export class PegarPostesPessoaController {
  @Inject(PegarPostesPessoaUseCase)
  private readonly pegarPostesPessoaUseCase: PegarPostesPessoaUseCase;

  @UseGuards(JwtAuthGuard)
  @Get(':idPessoa')
  pegarPostes(@Param('idPessoa') idPessoa: number) {
    return this.pegarPostesPessoaUseCase.execute(idPessoa);
  }
}

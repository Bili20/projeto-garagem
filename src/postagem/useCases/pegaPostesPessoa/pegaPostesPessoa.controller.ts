import { Body, Controller, Get, Inject, Param } from '@nestjs/common';
import { PegarPostesPessoaUseCase } from './pegaPostesPessoa.use-case';

@Controller('pegar/postes')
export class PegarPostesPessoaController {
  @Inject(PegarPostesPessoaUseCase)
  private readonly pegarPostesPessoaUseCase: PegarPostesPessoaUseCase;

  @Get(':idPessoa')
  pegarPostes(@Param('idPessoa') idPessoa: number) {
    return this.pegarPostesPessoaUseCase.execute(idPessoa);
  }
}

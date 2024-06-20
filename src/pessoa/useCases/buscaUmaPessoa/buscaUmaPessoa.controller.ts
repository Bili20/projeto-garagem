import { Controller, Get, Inject, Param } from '@nestjs/common';
import { BuscaUmaPEssoaUseCase } from './buscaUmaPessoa.use-case';

@Controller()
export class BuscaUmaPessoaController {
  @Inject(BuscaUmaPEssoaUseCase)
  private readonly buscaUmaPessoaUseCase: BuscaUmaPEssoaUseCase;

  @Get(':idPessoa')
  buscaUmaPessoa(@Param('idPessoa') idPessoa: number) {
    return this.buscaUmaPessoaUseCase.execute(idPessoa);
  }
}

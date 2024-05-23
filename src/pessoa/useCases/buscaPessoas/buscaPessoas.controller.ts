import { Controller, Get, Inject } from '@nestjs/common';
import { BuscaPessoasUsecase } from './buscaPessoas.use-case';

@Controller('pessoas')
export class BuscaPessoasController {
  @Inject(BuscaPessoasUsecase)
  private readonly buscaPessoasUseCase: BuscaPessoasUsecase;

  @Get()
  cadastro() {
    return this.buscaPessoasUseCase.execute();
  }
}

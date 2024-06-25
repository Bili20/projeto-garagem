import { Controller, Get, Inject, UseGuards } from '@nestjs/common';
import { BuscaPessoasUsecase } from './buscaPessoas.use-case';
import { JwtAuthGuard } from 'src/autenticacao/guards/jwt.guard';

@Controller('pessoas')
export class BuscaPessoasController {
  @Inject(BuscaPessoasUsecase)
  private readonly buscaPessoasUseCase: BuscaPessoasUsecase;

  @UseGuards(JwtAuthGuard)
  @Get()
  cadastro() {
    return this.buscaPessoasUseCase.execute();
  }
}

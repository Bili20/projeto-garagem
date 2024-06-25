import { Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { PegaUmPosteUseCase } from './pegaUmPoste.use-case';

@Controller('post')
export class PegaUmPostController {
  @Inject(PegaUmPosteUseCase)
  private readonly pegaUmPostUseCase: PegaUmPosteUseCase;

  @Get(':id')
  pegaUmPost(@Param('id') id: number) {
    return this.pegaUmPostUseCase.execute(id);
  }
}

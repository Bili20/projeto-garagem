import { Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { PegaUmPostUseCase } from './pegaUmPoste.use-case';

@Controller('post')
export class PegaUmPostController {
  @Inject(PegaUmPostUseCase)
  private readonly pegaUmPostUseCase: PegaUmPostUseCase;

  @Get(':id')
  pegaUmPost(@Param('id') id: number) {
    return this.pegaUmPostUseCase.execute(id);
  }
}

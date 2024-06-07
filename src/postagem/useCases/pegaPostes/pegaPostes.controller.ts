import { Controller, Get, Inject, Query } from '@nestjs/common';
import { PegaPostesUseCase } from './pegaPostes.use-case';
import { PegaPostesDTO } from 'src/postagem/models/dtos/pegaPostes.dto';

@Controller('postes')
export class PegaPostesController {
  @Inject(PegaPostesUseCase)
  private readonly pegaPostesUseCase: PegaPostesUseCase;

  @Get()
  pegaPostes(@Query() params: PegaPostesDTO) {
    return this.pegaPostesUseCase.execute(params);
  }
}

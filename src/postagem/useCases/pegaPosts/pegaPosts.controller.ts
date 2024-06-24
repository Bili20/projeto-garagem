import { Controller, Get, Inject, Query, UseGuards } from '@nestjs/common';
import { PegaPostesUseCase } from './pegaPosts.use-case';
import { PegaPostesDTO } from 'src/postagem/models/dtos/pegaPost.dto';
import { JwtAuthGuard } from 'src/autenticacao/guards/jwt.guard';

@Controller('todos/posts')
export class PegaPostesController {
  @Inject(PegaPostesUseCase)
  private readonly pegaPostesUseCase: PegaPostesUseCase;

  @UseGuards(JwtAuthGuard)
  @Get()
  pegaPostes(@Query() params: PegaPostesDTO) {
    return this.pegaPostesUseCase.execute(params);
  }
}

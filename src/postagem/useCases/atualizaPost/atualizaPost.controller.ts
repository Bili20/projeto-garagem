import {
  Body,
  Controller,
  Inject,
  Param,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AtualizaPostUseCase } from './atualizaPost.use-case';
import { AtualizaPostDTO } from 'src/postagem/models/dtos/atualizaPost.dto';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/autenticacao/guards/jwt.guard';

@Controller('atualiza/post')
export class AtualizaPostController {
  @Inject(AtualizaPostUseCase)
  private readonly atualizaPostUseCase: AtualizaPostUseCase;

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  atualizaPost(
    @Param('id') id: number,
    @Body() param: AtualizaPostDTO,
    @Req() req: Request,
  ) {
    return this.atualizaPostUseCase.execute(id, param, req);
  }
}

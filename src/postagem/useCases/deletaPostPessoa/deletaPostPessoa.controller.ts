import {
  Body,
  Controller,
  Delete,
  Inject,
  Req,
  UseGuards,
} from '@nestjs/common';
import { DeletaPostePessoaUseCase } from './deletaPostPessoa.use-case';
import { DeletaPostDTO } from 'src/postagem/models/dtos/deletaPoste.dto';
import { JwtAuthGuard } from 'src/autenticacao/guards/jwt.guard';
import { Request } from 'express';

@Controller('deleta/post')
export class DeletaPostPessoaController {
  @Inject(DeletaPostePessoaUseCase)
  private readonly deletaPostPessoaUsecase: DeletaPostePessoaUseCase;

  @UseGuards(JwtAuthGuard)
  @Delete()
  deletaPost(@Body() param: DeletaPostDTO, @Req() req: Request) {
    return this.deletaPostPessoaUsecase.execute(param, req);
  }
}

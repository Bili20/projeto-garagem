import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PegarPostsPessoaUseCase } from './pegaPostsPessoa.use-case';
import { JwtAuthGuard } from 'src/autenticacao/guards/jwt.guard';
import { Request } from 'express';

@Controller('pegar/posts/pessoa')
export class PegarPostsPessoaController {
  @Inject(PegarPostsPessoaUseCase)
  private readonly pegarPostesPessoaUseCase: PegarPostsPessoaUseCase;

  @UseGuards(JwtAuthGuard)
  @Get()
  pegarPostes(@Req() req: Request) {
    return this.pegarPostesPessoaUseCase.execute(req);
  }
}

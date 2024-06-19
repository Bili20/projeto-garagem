import { Body, Controller, Delete, Inject, UseGuards } from '@nestjs/common';
import { DeletaPostePessoaUseCase } from './deletaPostPessoa.use-case';
import { DeletaPostDTO } from 'src/postagem/models/dtos/deletaPoste.dto';
import { JwtAuthGuard } from 'src/autenticacao/guards/jwt.guard';

@Controller('deleta/post')
export class DeletaPostPessoaController {
  @Inject(DeletaPostePessoaUseCase)
  private readonly deletaPostPessoaUsecase: DeletaPostePessoaUseCase;

  @UseGuards(JwtAuthGuard)
  @Delete()
  deletaPost(@Body() param: DeletaPostDTO) {
    return this.deletaPostPessoaUsecase.execute(param);
  }
}

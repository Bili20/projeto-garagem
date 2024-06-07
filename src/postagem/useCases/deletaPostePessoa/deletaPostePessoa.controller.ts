import { Body, Controller, Delete, Inject } from '@nestjs/common';
import { DeletaPostePessoaUseCase } from './deletaPostePessoa.use-case';
import { DeletaPostDTO } from 'src/postagem/models/dtos/deletaPoste.dto';

@Controller('deleta/post')
export class DeletaPostPessoaController {
  @Inject(DeletaPostePessoaUseCase)
  private readonly deletaPostPessoaUsecase: DeletaPostePessoaUseCase;

  @Delete()
  deletaPost(@Body() param: DeletaPostDTO) {
    return this.deletaPostPessoaUsecase.execute(param);
  }
}

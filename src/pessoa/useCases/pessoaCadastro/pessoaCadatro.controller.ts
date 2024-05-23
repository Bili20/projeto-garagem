import { Body, Controller, Inject, Post } from '@nestjs/common';
import { PessoaCadastroUsecase } from './pessoaCadastro.use-case';
import { PessoaCadastroDTO } from 'src/pessoa/models/dtos/pessoaCadastro.dto';

@Controller('pessoa/cadastro')
export class PessoaCadastroController {
  @Inject(PessoaCadastroUsecase)
  private readonly pessoaCadastroUseCase: PessoaCadastroUsecase;

  @Post()
  cadastro(@Body() param: PessoaCadastroDTO) {
    return this.pessoaCadastroUseCase.execute(param);
  }
}

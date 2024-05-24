import { Body, Controller, Inject, Post } from '@nestjs/common';
import { EnderecoCadastroUseCase } from './enderecoCadastro.use-case';
import { CadastroEnderecoDTO } from 'src/endereco/models/dto/cadastroEndereco.dto';

@Controller('endereco/cadastro')
export class EnderecoCadatroController {
  @Inject(EnderecoCadastroUseCase)
  private readonly enderecoCadastroUseCase: EnderecoCadastroUseCase;

  @Post()
  cadastrar(@Body() param: CadastroEnderecoDTO) {
    return this.enderecoCadastroUseCase.execute(param);
  }
}

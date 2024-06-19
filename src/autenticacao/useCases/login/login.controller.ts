import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';
import { LoginUseCase } from './login.use-case';
import { LoginDTO } from 'src/autenticacao/models/dtos/login.dto';

@Controller('login')
export class LoginController {
  @Inject(LoginUseCase)
  private readonly loginUseCase: LoginUseCase;

  @Post()
  login(@Body() param: LoginDTO) {
    return this.loginUseCase.execute(param);
  }
}

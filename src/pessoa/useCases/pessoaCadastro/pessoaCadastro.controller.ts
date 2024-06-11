import {
  BadRequestException,
  Body,
  Controller,
  Inject,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { PessoaCadastroUsecase } from './pessoaCadastro.use-case';
import { PessoaCadastroDTO } from 'src/pessoa/models/dtos/pessoaCadastro.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { SalvarMidiaPerfilUseCase } from 'src/midia/usueCases/salvarMidiaPerfil/salvarMidiaPerfil.use-case';
import { existsSync, unlinkSync } from 'fs';

@Controller('pessoa/cadastro')
export class PessoaCadastroController {
  @Inject(PessoaCadastroUsecase)
  private readonly pessoaCadastroUseCase: PessoaCadastroUsecase;
  @Inject(SalvarMidiaPerfilUseCase)
  private readonly salvarMidiaPerfilUseCase: SalvarMidiaPerfilUseCase;

  @UseInterceptors(
    FileInterceptor('file', {
      limits: { fileSize: 10 * 1024 * 1024 },
      storage: diskStorage({
        destination: './files/perfil',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const filename = `${uniqueSuffix}${ext}`;
          callback(null, filename);
        },
      }),
    }),
  )
  @Post()
  async cadastro(
    @Body() param: PessoaCadastroDTO,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    try {
      const pessoa = await this.pessoaCadastroUseCase.execute(param);
      if (file) {
        await this.salvarMidiaPerfilUseCase.execute({
          nome: file.filename,
          idPessoa: pessoa,
        });
      }
    } catch (e) {
      if (file) {
        if (existsSync('files/perfil/' + file.filename)) {
          unlinkSync('files/perfil/' + file.filename);
        }
      }
      throw new BadRequestException({ message: 'Ocorreu um erro ao cadastar' });
    }
  }
}

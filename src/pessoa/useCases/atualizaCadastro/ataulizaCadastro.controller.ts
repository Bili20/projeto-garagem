import {
  BadRequestException,
  Body,
  Controller,
  Inject,
  Param,
  Patch,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { AtualizaMidiaUseCase } from 'src/midia/usueCases/ataulizaMidia/atualizaMidia.use-case';
import { AtualizaPessoaDTO } from 'src/pessoa/models/dtos/atualizaPessoa.dto';
import { AtualizaCadastroUseCase } from './atualizaCadastro.use-case';
import { existsSync, unlinkSync } from 'fs';
import { JwtAuthGuard } from 'src/autenticacao/guards/jwt.guard';
import { Request } from 'express';

@Controller('atualiza/informacoes')
export class AtualizaCadastroController {
  @Inject(AtualizaCadastroUseCase)
  private readonly atualizaCadastroUseCase: AtualizaCadastroUseCase;
  @Inject(AtualizaMidiaUseCase)
  private readonly atualizaMidiaUseCase: AtualizaMidiaUseCase;

  @UseGuards(JwtAuthGuard)
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
  @Patch()
  async atualizaCadastro(
    @Req() req: Request,
    @Body() param: AtualizaPessoaDTO,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    try {
      const data = await this.atualizaCadastroUseCase.execute(req, param);

      const idMidia = data.midia?.id;
      if (file) {
        await this.atualizaMidiaUseCase.execute(idMidia, {
          nome: file.filename,
          idPessoa: data.id,
        });
      }
    } catch (e) {
      if (file) {
        if (existsSync('files/perfil/' + file.filename)) {
          unlinkSync('files/perfil/' + file.filename);
        }
      }
      console.log(e);
      throw new BadRequestException({ message: 'Erro ao atualizar dados' });
    }
  }
}

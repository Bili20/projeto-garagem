import {
  Body,
  Controller,
  HttpException,
  Inject,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { SalvarMidiaUsecase } from 'src/midia/usueCases/salvarMidia/salvarMidia.use-case';
import { CriarPostagemDTO } from 'src/postagem/models/dtos/criarPostagen.dto';
import { CriaPostUseCase } from './criaPost.use-case';
import { existsSync, unlinkSync } from 'fs';

@Controller('postar')
export class CriaPostController {
  @Inject(CriaPostUseCase)
  private readonly criaPostUseCase: CriaPostUseCase;
  @Inject(SalvarMidiaUsecase)
  private readonly salvarMidiaUsecase: SalvarMidiaUsecase;

  @UseInterceptors(
    FilesInterceptor('files', null, {
      limits: { fileSize: 10 * 1024 * 1024 },
      storage: diskStorage({
        destination: './files/posts',
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
  async criar(
    @Body() param: CriarPostagemDTO,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    try {
      const post = await this.criaPostUseCase.execute(param);
      files.map(async (file) => {
        await this.salvarMidiaUsecase.execute({
          idPostagem: post.id,
          nome: file.filename,
        });
      });
    } catch (e) {
      for (const file of files) {
        if (existsSync('files/posts/' + file.filename)) {
          unlinkSync('files/posts/' + file.filename);
        }
      }
      throw new HttpException(
        e.response ?? 'Erro ao fazer post',
        e.status ?? 400,
      );
    }
  }
}

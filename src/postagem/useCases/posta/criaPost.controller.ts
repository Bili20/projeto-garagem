import {
  Body,
  Controller,
  HttpException,
  Inject,
  Post,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { SalvarMidiaPostUsecase } from 'src/midia/usueCases/salvarMidiaPost/salvarMidia.use-case';
import { CriarPostagemDTO } from 'src/postagem/models/dtos/criarPost.dto';
import { CriaPostUseCase } from './criaPost.use-case';
import { existsSync, unlinkSync } from 'fs';
import { JwtAuthGuard } from 'src/autenticacao/guards/jwt.guard';
import { Request } from 'express';

@Controller('postar')
export class CriaPostController {
  @Inject(CriaPostUseCase)
  private readonly criaPostUseCase: CriaPostUseCase;
  @Inject(SalvarMidiaPostUsecase)
  private readonly salvarMidiaUsecase: SalvarMidiaPostUsecase;

  @UseGuards(JwtAuthGuard)
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
    @Req() req: Request,
    @Body() param: CriarPostagemDTO,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    try {
      const post = await this.criaPostUseCase.execute(param, req);
      files.map(async (file) => {
        await this.salvarMidiaUsecase.execute({
          idPostagem: post.data.id,
          nome: file.filename,
        });
      });
      return post;
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

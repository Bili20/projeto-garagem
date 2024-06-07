import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostagemEntity } from './models/entites/postagem.entity';
import { CriaPostUseCase } from './useCases/posta/criaPost.use-case';
import { PostagenRepo as PostagemRepo } from './repository/postagenRepo';
import { CriaPostController } from './useCases/posta/criaPost.controller';
import { SalvarMidiaUsecase } from 'src/midia/usueCases/salvarMidia/salvarMidia.use-case';
import { MidiaRepo } from 'src/midia/repository/midiaRepo';
import { MidiaEntity } from 'src/midia/models/entities/midia.entity';
import { PegarPostesPessoaUseCase } from './useCases/pegaPostesPessoa/pegaPostesPessoa.use-case';
import { PegarPostesPessoaController } from './useCases/pegaPostesPessoa/pegaPostesPessoa.controller';
import { DeletaMidiaUseCase } from 'src/midia/usueCases/deletaMidia/deletaMidia.use-case';
import { DeletaPostePessoaUseCase } from './useCases/deletaPostePessoa/deletaPostePessoa.use-case';
import { DeletaPostPessoaController } from './useCases/deletaPostePessoa/deletaPostePessoa.controller';
import { PegaUmPostePessoaUseCase } from './useCases/pegaUmpostePessoa/pegaUmPostePessoa.use-case';
import { PegaPostesUseCase } from './useCases/pegaPostes/pegaPostes.use-case';
import { PegaPostesController } from './useCases/pegaPostes/pegaPostes.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PostagemEntity, MidiaEntity])],
  providers: [
    CriaPostUseCase,
    PegarPostesPessoaUseCase,
    DeletaPostePessoaUseCase,
    PegaUmPostePessoaUseCase,
    PegaPostesUseCase,
    PostagemRepo,
    { provide: 'IPostagenRepo', useExisting: PostagemRepo },
    SalvarMidiaUsecase,
    DeletaMidiaUseCase,
    MidiaRepo,
    { provide: 'IMidiaRepo', useExisting: MidiaRepo },
  ],
  controllers: [
    CriaPostController,
    PegarPostesPessoaController,
    DeletaPostPessoaController,
    PegaPostesController,
  ],
})
export class PostagemModule {}

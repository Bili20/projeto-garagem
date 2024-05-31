import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostagemEntity } from './models/entites/postagem.entity';
import { CriaPostUseCase } from './useCases/posta/criaPost.use-case';
import { PostagenRepo } from './repository/postagenRepo';
import { CriaPostController } from './useCases/posta/criaPost.controller';
import { SalvarMidiaUsecase } from 'src/midia/usueCases/salvarMidia.use-case';
import { MidiaRepo } from 'src/midia/repository/midiaRepo';
import { MidiaEntity } from 'src/midia/models/entities/midia.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PostagemEntity, MidiaEntity])],
  providers: [
    CriaPostUseCase,
    PostagenRepo,
    { provide: 'IPostagenRepo', useExisting: PostagenRepo },
    SalvarMidiaUsecase,
    MidiaRepo,
    { provide: 'IMidiaRepo', useExisting: MidiaRepo },
  ],
  controllers: [CriaPostController],
})
export class PostagemModule {}

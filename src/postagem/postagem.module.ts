import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostagemEntity } from './models/entites/postagem.entity';
import { CriaPostUseCase } from './useCases/posta/criaPost.use-case';
import { PostagenRepo as PostagemRepo } from './repository/postagenRepo';
import { CriaPostController } from './useCases/posta/criaPost.controller';
import { SalvarMidiaPostUsecase } from 'src/midia/usueCases/salvarMidiaPost/salvarMidia.use-case';
import { MidiaRepo } from 'src/midia/repository/midiaRepo';
import { MidiaEntity } from 'src/midia/models/entities/midia.entity';
import { PegarPostesPessoaUseCase } from './useCases/pegaPostsPessoa/pegaPostesPessoa.use-case';
import { PegarPostesPessoaController } from './useCases/pegaPostsPessoa/pegaPostesPessoa.controller';
import { DeletaMidiaUseCase } from 'src/midia/usueCases/deletaMidia/deletaMidia.use-case';
import { DeletaPostePessoaUseCase } from './useCases/deletaPostPessoa/deletaPostPessoa.use-case';
import { DeletaPostPessoaController } from './useCases/deletaPostPessoa/deletaPostPessoa.controller';
import { PegaUmPostePessoaUseCase } from './useCases/pegaUmpostPessoa/pegaUmPostePessoa.use-case';
import { PegaPostesUseCase } from './useCases/pegaPosts/pegaPosts.use-case';
import { PegaPostesController } from './useCases/pegaPosts/pegaPosts.controller';
import { DiscontaPostGratuitoUseCase } from 'src/pessoa/useCases/discontaPost/discontaPost.use-case';
import { PessoaRepo } from 'src/pessoa/repository/typeorm/pessoaRepo';
import { PessoaEntity } from 'src/pessoa/models/entities/pessoa.entity';
import { BuscaUmaPEssoaUseCase } from 'src/pessoa/useCases/buscaUmaPessoa/buscaUmaPessoa.use-case';
import { UsuarioAtualUseCase } from 'src/utils/usuarioAtual/usuarioAtual.use-case';
import { JwtService } from '@nestjs/jwt';
import { EnviaPagamentoUseCase } from 'src/pagamento/useCases/enviaPagamento/enviaPagamento.use-case';

@Module({
  imports: [
    TypeOrmModule.forFeature([PostagemEntity, MidiaEntity, PessoaEntity]),
  ],
  providers: [
    CriaPostUseCase,
    PegarPostesPessoaUseCase,
    DeletaPostePessoaUseCase,
    PegaUmPostePessoaUseCase,
    PegaPostesUseCase,
    PostagemRepo,
    { provide: 'IPostagenRepo', useExisting: PostagemRepo },
    SalvarMidiaPostUsecase,
    DeletaMidiaUseCase,
    MidiaRepo,
    { provide: 'IMidiaRepo', useExisting: MidiaRepo },
    DiscontaPostGratuitoUseCase,
    BuscaUmaPEssoaUseCase,
    PessoaRepo,
    { provide: 'IPessoaRepo', useExisting: PessoaRepo },
    UsuarioAtualUseCase,
    JwtService,
    EnviaPagamentoUseCase,
  ],
  controllers: [
    CriaPostController,
    PegarPostesPessoaController,
    DeletaPostPessoaController,
    PegaPostesController,
  ],
})
export class PostagemModule {}

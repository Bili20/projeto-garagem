import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostagemEntity } from './models/entites/postagem.entity';
import { CriaPostUseCase } from './useCases/posta/criaPost.use-case';
import { PostagemRepo as PostagemRepo } from './repository/postagemRepo';
import { CriaPostController } from './useCases/posta/criaPost.controller';
import { SalvarMidiaPostUsecase } from 'src/midia/usueCases/salvarMidiaPost/salvarMidia.use-case';
import { MidiaRepo } from 'src/midia/repository/midiaRepo';
import { MidiaEntity } from 'src/midia/models/entities/midia.entity';
import { PegarPostsPessoaUseCase } from './useCases/pegaPostsPessoa/pegaPostsPessoa.use-case';
import { PegarPostsPessoaController } from './useCases/pegaPostsPessoa/pegaPostsPessoa.controller';
import { DeletaMidiaUseCase } from 'src/midia/usueCases/deletaMidia/deletaMidia.use-case';
import { DeletaPostePessoaUseCase } from './useCases/deletaPostPessoa/deletaPostPessoa.use-case';
import { DeletaPostPessoaController } from './useCases/deletaPostPessoa/deletaPostPessoa.controller';
import { PegaUmPostUseCase } from './useCases/pegaUmPost/pegaUmPoste.use-case';
import { PegaPostesUseCase } from './useCases/pegaPosts/pegaPosts.use-case';
import { PegaPostesController } from './useCases/pegaPosts/pegaPosts.controller';
import { DiscontaPostGratuitoUseCase } from 'src/pessoa/useCases/discontaPost/discontaPost.use-case';
import { PessoaRepo } from 'src/pessoa/repository/typeorm/pessoaRepo';
import { PessoaEntity } from 'src/pessoa/models/entities/pessoa.entity';
import { BuscaUmaPEssoaUseCase } from 'src/pessoa/useCases/buscaUmaPessoa/buscaUmaPessoa.use-case';
import { UsuarioAtualUseCase } from 'src/utils/usuarioAtual/usuarioAtual.use-case';
import { JwtService } from '@nestjs/jwt';
import { EnviaPagamentoUseCase } from 'src/pagamento/useCases/enviaPagamento/enviaPagamento.use-case';
import { AtualizaPostController } from './useCases/atualizaPost/atualizaPost.controller';
import { AtualizaPostUseCase } from './useCases/atualizaPost/atualizaPost.use-case';
import { BuscaUmEnderecoPessoaUseCase } from 'src/endereco/useCases/buscaUmEnderecoPessoa/buscaUmEnderecoPessoa.use-case';
import { EnderecoRepo } from 'src/endereco/repository/typeorm/enderecoRepo';
import { EnderecoEntity } from 'src/endereco/models/entities/endedreco.entity';
import { PegaUmPostController } from './useCases/pegaUmPost/pegaUmPost.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PostagemEntity,
      MidiaEntity,
      PessoaEntity,
      EnderecoEntity,
    ]),
  ],
  providers: [
    CriaPostUseCase,
    PegarPostsPessoaUseCase,
    DeletaPostePessoaUseCase,
    PegaUmPostUseCase,
    AtualizaPostUseCase,
    PegaPostesUseCase,
    PegaUmPostUseCase,
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
    BuscaUmEnderecoPessoaUseCase,
    EnderecoRepo,
    { provide: 'IEnderecoRepo', useExisting: EnderecoRepo },
  ],
  controllers: [
    CriaPostController,
    PegarPostsPessoaController,
    DeletaPostPessoaController,
    PegaPostesController,
    AtualizaPostController,
    PegaUmPostController,
  ],
})
export class PostagemModule {}

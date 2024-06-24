import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PessoaEntity } from './models/entities/pessoa.entity';
import { PessoaCadastroUsecase } from './useCases/pessoaCadastro/pessoaCadastro.use-case';
import { PessoaRepo } from './repository/typeorm/pessoaRepo';
import { PessoaCadastroController } from './useCases/pessoaCadastro/pessoaCadastro.controller';
import { BuscaPessoasUsecase } from './useCases/buscaPessoas/buscaPessoas.use-case';
import { BuscaPessoasController } from './useCases/buscaPessoas/buscaPessoas.controller';
import { BuscaUmaPEssoaUseCase } from './useCases/buscaUmaPessoa/buscaUmaPessoa.use-case';
import { SalvarMidiaPerfilUseCase } from 'src/midia/usueCases/salvarMidiaPerfil/salvarMidiaPerfil.use-case';
import { MidiaRepo } from 'src/midia/repository/midiaRepo';
import { MidiaEntity } from 'src/midia/models/entities/midia.entity';
import { AtualizaMidiaUseCase } from 'src/midia/usueCases/ataulizaMidia/atualizaMidia.use-case';
import { AtualizaCadastroUseCase } from './useCases/atualizaCadastro/atualizaCadastro.use-case';
import { AtualizaCadastroController } from './useCases/atualizaCadastro/ataulizaCadastro.controller';
import { BuscaInfoPessoaController } from './useCases/buscaInfoPessoa/buscaInfoPessoa.controller';
import { BuscaInfoPessoaUseCase } from './useCases/buscaInfoPessoa/buscaInfoPessoa.use-case';
import { UsuarioAtualUseCase } from 'src/utils/usuarioAtual/usuarioAtual.use-case';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([PessoaEntity, MidiaEntity])],
  providers: [
    BuscaUmaPEssoaUseCase,
    PessoaCadastroUsecase,
    AtualizaCadastroUseCase,
    BuscaPessoasUsecase,
    BuscaInfoPessoaUseCase,
    PessoaRepo,
    { provide: 'IPessoaRepo', useExisting: PessoaRepo },
    SalvarMidiaPerfilUseCase,
    AtualizaMidiaUseCase,
    MidiaRepo,
    { provide: 'IMidiaRepo', useExisting: MidiaRepo },
    UsuarioAtualUseCase,
    JwtService,
  ],
  controllers: [
    PessoaCadastroController,
    BuscaPessoasController,
    AtualizaCadastroController,
    BuscaInfoPessoaController,
  ],
})
export class PessoaModule {}

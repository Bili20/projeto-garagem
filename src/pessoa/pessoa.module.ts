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

@Module({
  imports: [TypeOrmModule.forFeature([PessoaEntity, MidiaEntity])],
  providers: [
    BuscaUmaPEssoaUseCase,
    PessoaCadastroUsecase,
    AtualizaCadastroUseCase,
    BuscaPessoasUsecase,
    PessoaRepo,
    { provide: 'IPessoaRepo', useExisting: PessoaRepo },
    SalvarMidiaPerfilUseCase,
    AtualizaMidiaUseCase,
    MidiaRepo,
    { provide: 'IMidiaRepo', useExisting: MidiaRepo },
  ],
  controllers: [
    PessoaCadastroController,
    BuscaPessoasController,
    AtualizaCadastroController,
  ],
})
export class PessoaModule {}

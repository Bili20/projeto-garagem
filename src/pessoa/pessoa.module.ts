import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PessoaEntity } from './models/entities/pessoa.entity';
import { PessoaCadastroUsecase } from './useCases/pessoaCadastro/pessoaCadastro.use-case';
import { PessoaRepo } from './repository/typeorm/pessoaRepo';
import { PessoaCadastroController } from './useCases/pessoaCadastro/pessoaCadatro.controller';
import { BuscaPessoasUsecase } from './useCases/buscaPessoas/buscaPessoas.use-case';
import { BuscaPessoasController } from './useCases/buscaPessoas/buscaPessoas.controller';
import { BuscaUmaPEssoaUseCase } from './useCases/buscaUmaPessoa/buscaUmaPessoa.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([PessoaEntity])],
  providers: [
    BuscaUmaPEssoaUseCase,
    PessoaCadastroUsecase,
    BuscaPessoasUsecase,
    PessoaRepo,
    { provide: 'IPessoaRepo', useExisting: PessoaRepo },
  ],
  controllers: [PessoaCadastroController, BuscaPessoasController],
})
export class PessoaModule {}

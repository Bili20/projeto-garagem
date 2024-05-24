import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PessoaEntity } from 'src/pessoa/models/entities/pessoa.entity';
import { PessoaRepo } from 'src/pessoa/repository/typeorm/pessoaRepo';
import { BuscaUmaPEssoaUseCase } from 'src/pessoa/useCases/buscaUmaPessoa/buscaUmaPessoa.use-case';
import { EnderecoEntity } from './models/entities/endedreco.entity';
import { EnderecoRepo } from './repository/typeorm/enderecoRepo';
import { EnderecoCadatroController } from './useCases/enderecoCadastro/enderecoCadastro.controller';
import { EnderecoCadastroUseCase } from './useCases/enderecoCadastro/enderecoCadastro.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([EnderecoEntity, PessoaEntity])],
  providers: [
    EnderecoRepo,
    EnderecoCadastroUseCase,
    { provide: 'IEnderecoRepo', useExisting: EnderecoRepo },
    BuscaUmaPEssoaUseCase,
    PessoaRepo,
    { provide: 'IPessoaRepo', useExisting: PessoaRepo },
  ],
  controllers: [EnderecoCadatroController],
})
export class EnderecoModule {}

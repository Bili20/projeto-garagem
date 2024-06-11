import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PessoaEntity } from 'src/pessoa/models/entities/pessoa.entity';
import { ValidaUsuarioUseCase } from './useCases/validaUsuario/validaUsuario.use-case';
import { AutenticacaoRepo } from './repository/autenticacaoRepo';

@Module({
  imports: [TypeOrmModule.forFeature([PessoaEntity])],
  providers: [
    ValidaUsuarioUseCase,
    AutenticacaoRepo,
    { provide: 'IAutenticacaoRepo', useExisting: AutenticacaoRepo },
  ],
  controllers: [],
})
export class AutenticacaoModule {}

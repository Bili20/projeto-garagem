import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PessoaEntity } from 'src/pessoa/models/entities/pessoa.entity';
import { PessoaRepo } from 'src/pessoa/repository/typeorm/pessoaRepo';
import { BuscaPorEmailUseCase } from 'src/pessoa/useCases/buscaPorEmail/buscaPorEmail.use-case';
import { AutenticacaoRepo } from './repository/autenticacaoRepo';
import { LoginController } from './useCases/login/login.controller';
import { LoginUseCase } from './useCases/login/login.use-case';
import { ValidaUsuarioUseCase } from './useCases/validaUsuario/validaUsuario.use-case';
import { JwtStrategy } from './strategy/jwt.strategy';
@Module({
  imports: [
    TypeOrmModule.forFeature([PessoaEntity]),
    PassportModule,
    JwtModule.register({
      secret: 'asduhad89ayd98adyh0ahda0d',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [
    LoginUseCase,
    ValidaUsuarioUseCase,
    AutenticacaoRepo,
    { provide: 'IAutenticacaoRepo', useExisting: AutenticacaoRepo },
    BuscaPorEmailUseCase,
    PessoaRepo,
    { provide: 'IPessoaRepo', useExisting: PessoaRepo },
    JwtStrategy,
  ],
  controllers: [LoginController],
})
export class AutenticacaoModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PessoaEntity } from 'src/pessoa/models/entities/pessoa.entity';
import { ValidaUsuarioUseCase } from './useCases/validaUsuario/validaUsuario.use-case';
import { AutenticacaoRepo } from './repository/autenticacaoRepo';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
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
    ValidaUsuarioUseCase,
    AutenticacaoRepo,
    { provide: 'IAutenticacaoRepo', useExisting: AutenticacaoRepo },
  ],
  controllers: [],
})
export class AutenticacaoModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MidiaEntity } from './models/entities/midia.entity';
import { SalvarMidiaPostUsecase } from './usueCases/salvarMidiaPost/salvarMidia.use-case';
import { MidiaRepo } from './repository/midiaRepo';
import { DeletaMidiaUseCase } from './usueCases/deletaMidia/deletaMidia.use-case';
import { SalvarMidiaPerfilUseCase } from './usueCases/salvarMidiaPerfil/salvarMidiaPerfil.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([MidiaEntity])],
  providers: [
    SalvarMidiaPostUsecase,
    SalvarMidiaPerfilUseCase,
    DeletaMidiaUseCase,
    MidiaRepo,
    { provide: 'IMidiaRepo', useExisting: MidiaRepo },
  ],
})
export class MidiaModule {}

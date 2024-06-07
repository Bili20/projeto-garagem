import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MidiaEntity } from './models/entities/midia.entity';
import { SalvarMidiaUsecase } from './usueCases/salvarMidia/salvarMidia.use-case';
import { MidiaRepo } from './repository/midiaRepo';
import { DeletaMidiaUseCase } from './usueCases/deletaMidia/deletaMidia.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([MidiaEntity])],
  providers: [
    SalvarMidiaUsecase,
    DeletaMidiaUseCase,
    MidiaRepo,
    { provide: 'IMidiaRepo', useExisting: MidiaRepo },
  ],
})
export class MidiaModule {}

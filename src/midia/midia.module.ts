import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MidiaEntity } from './models/entities/midia.entity';
import { SalvarMidiaUsecase } from './usueCases/salvarMidia.use-case';
import { MidiaRepo } from './repository/midiaRepo';

@Module({
  imports: [TypeOrmModule.forFeature([MidiaEntity])],
  providers: [
    SalvarMidiaUsecase,
    MidiaRepo,
    { provide: 'IMidiaRepo', useExisting: MidiaRepo },
  ],
})
export class MidiaModule {}

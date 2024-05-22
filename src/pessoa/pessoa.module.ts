import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PessoaEntity } from './models/entities/pessoa.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PessoaEntity])],
  providers: [],
  controllers: [],
})
export class PessoaModule {}

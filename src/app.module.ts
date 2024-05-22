import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { PessoaModule } from './pessoa/pessoa.module';
import { EnderecoModule } from './endereco/endereco.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), PessoaModule, EnderecoModule],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { PessoaModule } from './pessoa/pessoa.module';
import { EnderecoModule } from './endereco/endereco.module';
import { PostagemModule } from './postagem/postagem.module';
import { MidiaModule } from './midia/midia.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    PessoaModule,
    EnderecoModule,
    PostagemModule,
    MidiaModule,
  ],
})
export class AppModule {}

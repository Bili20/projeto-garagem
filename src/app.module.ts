import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { PessoaModule } from './pessoa/pessoa.module';
import { EnderecoModule } from './endereco/endereco.module';
import { PostagenModule } from './postagem/postagen.module';
import { MidiaModule } from './midia/midia.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    PessoaModule,
    EnderecoModule,
    PostagenModule,
    MidiaModule,
  ],
})
export class AppModule {}

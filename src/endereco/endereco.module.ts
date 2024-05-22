import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnderecoEntiry } from './models/entities/endedreco.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EnderecoEntiry])],
  providers: [],
  controllers: [],
})
export class EnderecoModule {}

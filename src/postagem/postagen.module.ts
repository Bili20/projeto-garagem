import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostagenEntity } from './models/entites/postagen.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PostagenEntity])],
  providers: [],
  controllers: [],
})
export class PsotagenModule {}

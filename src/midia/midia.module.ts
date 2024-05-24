import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MidiaEntity } from './models/entities/midia.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MidiaEntity])],
})
export class MidiaModule {}

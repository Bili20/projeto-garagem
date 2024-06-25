import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'Si&72087',
  database: 'pggaragem',
  entities: [__dirname + './../**/*.entity.{js,ts}'],
  synchronize: true,
};

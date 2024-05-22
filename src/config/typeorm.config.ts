import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: '127.0.0.1',
  port: 5432,
  username: 'pguser',
  password: 'pgpassword',
  database: 'pggaragem',
  entities: [__dirname + './../**/*.entity.{js,ts}'],
  synchronize: true,
};

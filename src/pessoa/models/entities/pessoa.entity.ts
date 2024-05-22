import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('pessoa')
export class PessoaEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'nome' })
  nome: string;

  @Column({ name: 'data_nacimento', type: 'datetime' })
  dataNacimento: Date;

  @Column({ name: 'sexo' })
  sexo: string;

  @Column({ name: 'email' })
  email: string;

  @Column({ name: 'senha' })
  senha: string;
}

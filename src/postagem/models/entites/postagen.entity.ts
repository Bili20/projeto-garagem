import { PessoaEntity } from 'src/pessoa/models/entities/pessoa.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('postagen')
export class PostagenEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'titulo' })
  titulo: string;

  @Column({ name: 'data_cadastro' })
  dataCadastro: Date;

  @Column({ name: 'status' })
  status: string;

  @Column({ name: 'id_pessoa' })
  idPessoa: number;

  @ManyToOne(() => PessoaEntity, (pessoa: PessoaEntity) => pessoa.postagen)
  @JoinColumn({ name: 'id_pessoa' })
  pessoa: PessoaEntity;
}

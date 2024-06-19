import { MidiaEntity } from 'src/midia/models/entities/midia.entity';
import { PessoaEntity } from 'src/pessoa/models/entities/pessoa.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum statusEnum {
  D = 'Disponivel',
  V = 'Vendido',
}
@Entity('postagem')
export class PostagemEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'titulo' })
  titulo: string;

  @Column({ name: 'descricao' })
  descricao: string;

  @Column({ name: 'valor', nullable: true })
  valor: number;

  @Column({ name: 'anuncio', default: false })
  anuncio: boolean;

  @Column({
    name: 'data_cadastro',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  dataCadastro: Date;

  @Column({ name: 'status' })
  status: string;

  @Column({ name: 'id_pessoa' })
  idPessoa: number;

  @ManyToOne(() => PessoaEntity, (pessoa: PessoaEntity) => pessoa.postagen)
  @JoinColumn({ name: 'id_pessoa' })
  pessoa: PessoaEntity;

  @OneToMany(() => MidiaEntity, (midia: MidiaEntity) => midia.postagen)
  midia: MidiaEntity[];
}

import { PessoaEntity } from 'src/pessoa/models/entities/pessoa.entity';
import { PostagemEntity } from 'src/postagem/models/entites/postagem.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('midia')
export class MidiaEntity {
  constructor(props?: {
    idPostagem?: number;
    idPessoa?: number;
    nome: string;
  }) {
    Object.assign(this, props);
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'nome' })
  nome: string;

  @Column({ name: 'id_postagem', nullable: true })
  idPostagem: number;

  @Column({ name: 'id_pessoa', nullable: true })
  idPessoa: number;

  @ManyToOne(() => PostagemEntity, (postagem: PostagemEntity) => postagem.midia)
  @JoinColumn({ name: 'id_postagem' })
  postagen: PostagemEntity;

  @OneToOne(() => PessoaEntity, (pessoa: PessoaEntity) => pessoa.midia)
  @JoinColumn({ name: 'id_pessoa' })
  pessoa: PessoaEntity;
}

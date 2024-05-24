import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PessoaCadastroDTO } from '../dtos/pessoaCadastro.dto';
import { EnderecoEntity } from 'src/endereco/models/entities/endedreco.entity';
import { PostagenEntity } from 'src/postagem/models/entites/postagen.entity';

@Entity('pessoa')
export class PessoaEntity {
  constructor(props?: PessoaCadastroDTO) {
    Object.assign(this, props);
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'nome' })
  nome: string;

  @Column({ unique: true, name: 'documento' })
  documento: string;

  @Column({ name: 'data_nacimento', type: 'date' })
  dataNacimento: Date;

  @Column({ name: 'sexo' })
  sexo: string;

  @Column({ unique: true, name: 'email' })
  email: string;

  @Column({ name: 'senha' })
  senha: string;

  @OneToOne(() => EnderecoEntity, (endereco: EnderecoEntity) => endereco.pessoa)
  endereco: EnderecoEntity;

  @OneToMany(
    () => PostagenEntity,
    (postagen: PostagenEntity) => postagen.pessoa,
  )
  postagen: PostagenEntity[];
}

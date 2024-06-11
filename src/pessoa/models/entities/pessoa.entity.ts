import { EnderecoEntity } from 'src/endereco/models/entities/endedreco.entity';
import { PostagemEntity } from 'src/postagem/models/entites/postagem.entity';
import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PessoaCadastroDTO } from '../dtos/pessoaCadastro.dto';
import { MidiaEntity } from 'src/midia/models/entities/midia.entity';

export enum sexosEnum {
  M = 'Masculino',
  F = 'Feminino',
  O = 'Outro',
}

@Entity('pessoa')
export class PessoaEntity {
  constructor(props?: {
    nome?: string;
    documento?: string;
    dataNacimento?: Date;
    sexo?: string;
    email?: string;
    senha?: string;
  }) {
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
    () => PostagemEntity,
    (postagen: PostagemEntity) => postagen.pessoa,
  )
  postagen: PostagemEntity[];

  @OneToOne(() => MidiaEntity, (midia: MidiaEntity) => midia.pessoa)
  midia: MidiaEntity;
}

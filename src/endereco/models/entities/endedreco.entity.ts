import { PessoaEntity } from 'src/pessoa/models/entities/pessoa.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('endereco')
export class EnderecoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'cep' })
  cep: string;

  @Column({ name: 'bairro' })
  bairro: string;

  @Column({ name: 'rua' })
  rua: string;

  @Column({ name: 'cidade' })
  cidade: string;

  @Column({ name: 'numero' })
  numero: string;

  @Column({ name: 'complemento', nullable: true })
  complemento: string;

  @Column({ name: 'uf' })
  uf: string;

  @Column({ unique: true, name: 'id_pessoa' })
  idPessoa: number;

  @OneToOne(() => PessoaEntity, (pessoa: PessoaEntity) => pessoa.endereco)
  @JoinColumn({ name: 'id_pessoa' })
  pessoa: PessoaEntity;
}

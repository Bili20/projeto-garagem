import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { PessoaCadastroDTO } from '../dtos/pessoaCadastro.dto';

@Entity('pessoa')
export class PessoaEntity {
  constructor(props?: PessoaCadastroDTO) {
    Object.assign(this, props);
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'nome' })
  nome: string;

  @Column({ name: 'documento' })
  documento: string;

  @Column({ name: 'data_nacimento', type: 'date' })
  dataNacimento: Date;

  @Column({ name: 'sexo' })
  sexo: string;

  @Column({ name: 'email' })
  email: string;

  @Column({ name: 'senha' })
  senha: string;
}

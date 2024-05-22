import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('endereco')
export class EnderecoEntiry {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'cep' })
  cep: string;

  @Column({ name: 'bairro' })
  bairro: string;

  @Column({ name: 'numero' })
  numero: string;

  @Column({ name: 'logradouro' })
  logradouro: string;

  @Column({ name: 'uf' })
  uf: string;
}

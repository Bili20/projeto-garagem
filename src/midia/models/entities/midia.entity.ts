import { PostagemEntity } from 'src/postagem/models/entites/postagem.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('midia')
export class MidiaEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'string' })
  nome: string;

  @Column({ name: 'id_postagem' })
  idPostagem: number;

  @ManyToOne(() => PostagemEntity, (postagem: PostagemEntity) => postagem.midia)
  @JoinColumn({ name: 'id_postagem' })
  postagen: PostagemEntity;
}

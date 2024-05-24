import { PostagenEntity } from 'src/postagem/models/entites/postagen.entity';
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

  @Column({ name: 'id_postagen' })
  idPostagen: number;

  @ManyToOne(() => PostagenEntity, (postagen: PostagenEntity) => postagen.midia)
  @JoinColumn({ name: 'id_postagen' })
  postagen: PostagenEntity;
}

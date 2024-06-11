import { MidiaEntity } from '../entities/midia.entity';

export interface IMidiaRepo {
  salvar(param: MidiaEntity): Promise<void>;
  deletar(param: MidiaEntity): Promise<void>;
  buscaMidias(idPostagem: number): Promise<MidiaEntity[]>;
  buscaUm(id: number): Promise<MidiaEntity>;
  atualizar(id: number, param: MidiaEntity): Promise<void>;
}

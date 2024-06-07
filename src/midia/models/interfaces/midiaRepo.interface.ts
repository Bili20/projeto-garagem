import { SalvarMidiaDTO } from '../dtos/salvarMidia.dto';
import { MidiaEntity } from '../entities/midia.entity';

export interface IMidiaRepo {
  salvar(param: SalvarMidiaDTO): Promise<void>;
  deletar(param: MidiaEntity): Promise<void>;
  buscaMidias(idPostagem: number): Promise<MidiaEntity[]>;
}

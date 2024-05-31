import { SalvarMidiaDTO } from '../dtos/salvarMidia.dto';

export interface IMidiaRepo {
  salvar(param: SalvarMidiaDTO): Promise<void>;
}

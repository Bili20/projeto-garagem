import { Injectable } from '@nestjs/common';
import { PessoaCadastroDTO } from '../dtos/pessoaCadastro.dto';
import { PessoaEntity } from '../entities/pessoa.entity';

export interface IPessoaRepo {
  cadastrar(param: PessoaCadastroDTO): Promise<void>;
  buscarPessoas(): Promise<PessoaEntity[]>;
  buscarUmaPessoa(id: number): Promise<PessoaEntity>;
}

import { Injectable } from '@nestjs/common';
import { PessoaCadastroDTO } from '../dtos/pessoaCadastro.dto';
import { PessoaEntity } from '../entities/pessoa.entity';

export interface IPessoaRepo {
  cadastrar(param: PessoaCadastroDTO): Promise<number>;
  buscarPessoas(): Promise<PessoaEntity[]>;
  buscarUmaPessoa(id: number): Promise<PessoaEntity>;
  buscaInformacoePessoa(id: number): Promise<PessoaEntity>;
  buscaporEmail(email: string): Promise<PessoaEntity>;
  atualizar(id: number, param: PessoaEntity): Promise<number>;
}

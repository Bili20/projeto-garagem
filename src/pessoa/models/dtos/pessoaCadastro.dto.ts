enum sexos {
  M = 'Masculino',
  F = 'Feminino',
  O = 'Outro',
}

export class PessoaCadastroDTO {
  nome: string;
  documento: string;
  dataNacimento: Date;
  sexo: sexos;
  email: string;
  senha: string;
}

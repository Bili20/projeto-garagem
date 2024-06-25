### Rotas

## Login

# baseurl/login

- body

```
  email: string
  senha: string
```

## Pessoa

# baseurl/pessoa/cadastro

- multipart-form

```
  nome: string
  documeto: string
  dataNacimento: Date
  sexo: string
  email: string
  senha: string
  file: file
```

# baseurl/pessoas

# baseurl/informacoes/pessoa

# baseurl/atauliza/informacoes/:id

- multipart-form

```
  nome: string
  documeto: string
  dataNacimento: Date
  sexo: string
  email: string
  senha: string
  file: file
```

## Endereco

# baseurl/endereco/cadastro

- body

```
  cep: string
  bairro: string
  cidade: string
  rua: string
  numero: string
  complemento: string
  uf: string
  idPessoa: number
```

## Postagem

# baseurl/atualiza/post/:id

- parametro

```
  id: number
```

- body

```
  titulo: string
  descricao: string
  valor: number
```

# baseurl/deleta/post

- body

```
  id: number
```

# baseurl/todos/posts

- query
  ```
  pagina: number
  quantidade: number
  ```

# baseurl/post/:id

- parametro

```
  id: number
```

# baseurl/pegar/posts/pessoa

# baseurl/postar

- parametro

```
  id: number
```

## Aviso: necessário dentro da pasta utils criar uma pasta constants com um arquivo constants.ts com essas variaveis:

# export const URLIMAGE = 'sua url';

# export const KEY ='token do PagSeguro';

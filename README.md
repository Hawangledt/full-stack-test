<p align="center">
  <img width="260" src="https://raw.githubusercontent.com/myTapp/temos-vagas/master/logo_mytapp_primario.png?raw=true">
</p>

## Teste full-stack developer (v1.2)
O teste consiste em criar uma aplicação com Node.js e PostgreSQL que expõe uma API REST de um CRUD de usuário e uma aplicação web contendo uma interface para login e acesso a dados de uma API externa.

Depois de logado o usuário da aplicação web deve poder acessar dados da [Punk API v2](https://punkapi.com/) - uma API aberta da cervejaria BrewDog.

### Back-end
- Todos os endpoints de consulta de dados devem ter autenticação por webtoken ou similar
- Fique a vontade para usar algum ORM de preferência ([sequelize](https://github.com/sequelize/sequelize), [typeorm](https://github.com/typeorm/typeorm), ...)

> O CRUD de usuários não necessita interface, coloque os endpoints disponíveis no README do projeto.

### Front-end
O front-end deve apresentar pelo menos os seguintes requisitos:
  - Interface de login
    - Feedbacks de usuário ou senha incorreta
  - Listagem dos dados da Punk API v2
  - Paginação dos dados
  
> Pode ser utilizado qualquer framework front-end, preprocessadores de css, task runners, bundlers, ... de sua preferência, mas nenhum deles é de uso obrigatório.

## Critérios de avaliação
- Funcionamento do projeto
- Estrutura do código
- Uso de boas práticas
- Cumprimento dos requisitos mínimos

## Deve ser entregue:
- Um repositório git (fork deste)
- Um README do projeto com o passo-a-passo para executar a aplicação.
> Não se deve fazer o commit de pastas como `node_modules`, o projeto deve instalar suas dependências a partir do `package.json`

## Extras:
- Build para produção
- Docker file com todas dependências


# Nota do Autor:
- O Projeto consiste em um backend integrado a um banco de dados postgres e um frontend.

## Execução do Backend
- Dentro da pasta /backend crie um arquivo .env e utilize o docker-compose para iniciar o servidor

### Rotas Básicas
- Criar um usuário: POST `/api/createOneUser`
  ```
  {
      "email": string REQUIRED,
      "password": string REQUIRED,
      "name": string REQUIRED,
  }
  ```
- Receber um Token de autenticação: POST `/api/loginUser`
  ```
  {
      "email": string REQUIRED,
      "password": string REQUIRED,
  }
  ```

- Listar todos os usuários: GET `/api/listUser` || Requer um Token de Autenticação
- Remover ( Deleção lógica ) um usuário: REMOVE `/api/deleteOneUser/:id` || Requer um Token de Autenticação
- Reativar um usuário: PATCH `/api/restoreOneUser/:id` || Requer um Token de Autenticação
- Alterar um usuário: PATCH `/api/updateOneUser/:id` || Requer um Token de Autenticação
  ```
  {
      "name": string,
      "email": string
  }
  ```
- Alterar a senha de um usuário: POST `/api/updatePassword` || Requer um Token de Autenticação
  ```
  {
      "password": string
  }
  ```
## Execução do Frontend
- Dentro da pasta /frontend crie um arquivo .env e utilize o docker-compose para iniciar o servidor
- Para efetuar o login, um usuário deverá ter sido criado pelo backend.
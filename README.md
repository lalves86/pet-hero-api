# PetHero

API para que usuários possam cadastrar um pet para adoção.

Desenvolvido em Node.js com typescript, usando o _framework_ _express_, persiste os dados em um banco postgres, e suporta as operações de cadastro listagem, atualização e remoção de pets no banco.

Para fazer modificações, é necessário ser um usuário cadastrado e autenticado.

## Estrutura do projeto

O projeto segue uma estrutura padrão para cada um dos domínios da aplicação, que foram separados em módulos.

A pasta de entrada é a pasta **src**, que contém todo o código desenvolvido para o projeto.

Dentro da pasta **src**, na pasta **modules**, temos os dois domínios da aplicação, que são o **users** e o **pets**.

A pasta **shared** contém arquivos que são necessários em mais de um domínio da aplicação, como a **container**, onde são registrados os repositórios para injeção de dependêncicas, a pasta **errors**, que contém uma classe para tratamento de exceções de maneira personalizada, e a pasta **infra**, que contém as decisões de infra estrutura da aplicação.

A pasta **infra** tem duas divisões, a pasta **http**, que tem por objetivo centralizar as decisões relativas ao protocolo HTTP, como a configuração inicial do _express_, no arquivo **server.ts**, e o arquivo principal de rotas. Já a pasta **typeorm** contem as **migrations** e a configuração inicial do _typeorm_, ORM escolhido para lidar com o banco de dados.

A pasta **config** contem todas as configurações necessárias para os serviços da aplicação, que podem se repetir em mais de um local, como a configuração do _token_ **JWT**.

Dentro de **modules**, a estrutura padrão se repete em todos domínios da aplicação. Dentro da pasta **pets**, por exemplo, encontramos a pasta **dtos**, que tem as modelagens dos dados que precisam ser transferidos de uma camada a outra da aplicação, no caso, a criação de um novo _pet_, que precisa receber _name_, _species_, _breed_, _age_, _weight_ e _location_.

```
export default interface ICreatePetDTO {
  name: string;
  species: string;
  breed: string;
  age: number;
  weight: number,
  location: string;
}
```
Em seguida, existe a pasta **infra**, que tem todas as decisões técnicas para viabilizar a comunicação e a persistências dos dados, dentro dela, temos a pasta **http**, que contém uma pasta **routes** e uma pasta **controllers**, para o arquivo de rotas relativas ao domínio _pets_ e seus respectivos _controllers_ responsáveis por receber as requisições, direcionar os dados para os respectivos _services_, e retornar as respostas que serão exibidas nas rotas.

Dentro da pasta **infra** existe também a pasta **typeorm**, que contém a **entity**, onde está a modelagem dos dados a serem persistidos no banco de dados, e a pasta **repositories**, contendo os métodos relativos às interações com o banco.

Saindo da camada de _infra_, temos uma outra pasta, **repositories**, que contem um arquivo com a assinatura dos métodos utilizados para interagir com o banco. Isso é feito para que caso seja necessário mudar do _typeorm_ para alguma outra forma de interação com o banco, a refatoração do código fica restrita à camada de _infra_, não impactando no restante do projeto.

Na pasta **repositories** também existe a pasta **fakes**, que contém um _mock_ do repositório para a realização dos testes unitários, sem que seja necessário mexer de fato com a persistência dos dados no banco.

Por fim, temos a pasta **services**, que contém as implementações dos métodos das operações de **CRUD**, e os seus respectivos testes unitários.

Os _services_ são os responsáveis por implementar as regras de negócio da aplicação, chamando os métodos contidos na camada de _repositories_. Cada _service_ implementa apenas uma funcionalidade, portanto cada classe só tem um método, que foi chamado de _execute_. O _service_ é chamado pelo _controller_, chama o repositório correspondente, e retorna o resultado da consulta ao _controller_.


## Modelagem dos dados

Foram criados dois modelos de dados, um para representar os _pets_, e um para os _users_. O pet é representado pelo seu nome, sua espécie, raça, idade, peso e localização. Quando cadastrado, um id é atribuído automaticamente a ele, assim como os campos de data de criação e data de atualização. Os usuários são persistidos com um nome, um e-mail, um endereço e um _hash_ da senha escolhida. A senha é encriptada no momento da criação do usuário.

## Usando a aplicação em modo local

Para usar a aplicação, clone este repositório em sua máquina local utilizando no terminal o comando:

`git clone https://github.com/lalves86/pet-hero.git`

Com o repositório clonado, vá até a pasta raiz do projeto, e instale as dependências necessárias usando o comando:

`yarn`

É necessário uma conexão com um banco de dados **postgres** com o nome de **pethero_db**, a partir do docker é possível criar um container com o postgres através do comando:

```
docker run --name pethero-posgres-db -e POSTGRES_PASSWORD=docker -e POSTGRES_DB=pethero_db -p 5432:5432 -d postgres
```

Com o container em execução, executar as migrations através do comando:

`yarn typeorm migration:run`

Este comando irá criar as tabelas necessárias para interagir com o banco de dados.

Em seguida, podem ser usados os scripts para realizar as ações disponíveis

- `yarn test`: para executar os testes unitários.
- `yarn dev`: para iniciar um servidor em modo local no endereço: http://localhost:3001
- `yarn build`: para transpilar o código para produção
- `yarn start`: para iniciar o servidor, com checagem de tipos.
- `yarn typeorm`: para executar os comandos específicos deste orm (como migrations).

Com o servidor rodando, é possível interagir com o banco através das rotas disponíveis, usando uma ferramenta de teste de APIs (Postman ou Insomnia).

## Rotas

De acordo com os domínios da aplicação, foram criados dois conjuntos de rotas:

- `/pets`: para as operações na entidade _heroes_
  - `GET /`: Lista todos os pets cadastrados no banco
  - `GET /id`: Lista um pet específico, a partir do id
  - `POST /`: Cadastra um novo pet no banco passando as informações requeridas
    - **request.body**
    ```
    {
	    "userId": "852cd287-4d04-45ae-a1d0-cd208edc5d57",
	    "name": "Baloo",
      "species": "Cachorro",
      "breed": "Sem raça",
      "age": 4,
      "weight": 6,
      "location": "São Paulo"
    }
    ```
  - `PUT /id`: Permite alterar as informações do pet, a partir do id
    - **request.body**
    ```
    {
	    "userId": "852cd287-4d04-45ae-a1d0-cd208edc5d57",
	    "name": "Baloo",
      "species": "Cachorro",
      "breed": "Sem raça",
      "age": 4,
      "weight": 6,
      "location": "São Paulo"
    }
    ```
  - `DELETE /id`: Permite remover um pet, a partir do seu id

- `/users`: para as operações na entidade _users_
  - `GET /id`: Lista um usuário específico, a partir do id
  - `POST /`: Cadastra um novo usuário no banco
    - **request.body**
    ```
    {
	    "name": "John Doe",
	    "email": "johndoe@example.com",
      "address": "Example address",
      "password": "123456"
    }
    ```

- `/sessions`: para autenticar um usuário cadastrado
  - `POST /`: Autentica um usuário
    - **request.body**
    ```
    {
	    "email": "johndoe@example.com",
      "password": "123456"
    }
    ```

## Bibliotecas utilizadas

- Dependências de produção

  - "bcryptjs": "^2.4.3": para encriptação da senha
  - "celebrate": "^12.1.1": para validação do corpo das requisições
  - "class-transformer": "^0.2.3": Para manipular os campos a serem retornados pelas requisições
  - "dotenv": "^8.2.0": Para utilizar variáveis de ambiente
  - "express": "^4.17.1": framework para facilitar a criação do servidor
  - "express-async-errors": "^3.1.1": para que o node saiba lidar com a tratativa de erros de maneira centralizada
  - "jsonwebtoken": "^8.5.1": para criação do token JWT
  - "mongodb": "^3.5.9": para utilizar o mongodb com o node.js
  - "pg": "^8.2.1": para utilizar o banco de dados postgres
  - "reflect-metadata": "^0.1.13": para facilitar a utilização de **decorators** e injetar dependências
  - "tsyringe": "^4.3.0": Para fazer a injeção de dependências
  - "typeorm": "^0.2.25": ORM para interagir com o banco de dados
  - "uuidv4": "^6.1.1": para fazer a geração de ids de forma automatizada

- Principais dependências de desenvolvimento

  - "eslint": "^7.2.0": para determinar a padronização do código (segui o padrão do Airbnb)
  - "eslint-config-airbnb-base": "^14.2.0": diretivas de padronização do código
  - "eslint-config-prettier": "^6.11.0": para habilitar as configurações do prettier junto com o eslint
  - "eslint-import-resolver-typescript": "^2.0.0": para que o typescript entenda os padrões de importação de arquivos
  - "eslint-plugin-import": "^2.21.2": instalado para a garantir a padronização do código
  - "eslint-plugin-prettier": "^3.1.4": para usar o prettier em conjunto com o eslint
  - "jest": "^26.1.0": para implementar os testes unitários
  - "prettier": "^2.0.5": para corrigir os padrões do código automaticamente ao salvar
  - "ts-jest": "^26.1.1": para poder usar o jest com o typescript
  - "ts-node-dev": "^1.0.0-pre.49": para habilitar auto loading em modo de desenvolvimento
  - "tsconfig-paths": "^3.9.0": para que o arquivo de configuração entenda os caminhos de importação
  - "typescript": "^3.9.5": para poder utilizar o typescript com o node

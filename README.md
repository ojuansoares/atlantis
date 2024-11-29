# Atlantis

Bem-vindo ao Atlantis, o melhor sistema de gestão de clubes, hotéis e resorts do mundo! Este projeto é desenvolvido em TypeScript e está dividido em cinco partes principais: atv1, atv2, atv3, atv4 e atv5

## MVP e Atividades

O projeto está dividido em cinco partes principais:

- **atv1**: Implementação do padrão Protótipo para a classe `Telefone`.
- **atv2**: Implementação de Singleton, Strategy e CRUDs para clientes e dependentes.
- **atv3**: Gerenciamento de hospedagens e acomodações com classes diretoras.
- **atv4**: Protótipo SPA navegável para CRUDs, acomodações e hospedagens.
- **atv5**: Aplicação web completa baseada no protótipo SPA.

## Como Rodar

Para rodar o projeto, siga os passos abaixo:

# Front-end

1. Entre no diretório do front:
    ```sh
    cd .\front\
    ```

2. Instale as dependências:
    ```sh
    npm install
    ```

3. Execute o projeto:
    ```sh
    npm start
    ```

# Back-end

1. Entre no diretório do back:
    ```sh
    cd .\back\
    ```

2. Instale as dependências:
    ```sh
    npm install
    ```

3. Compile o projeto:
    ```sh
    npx tsc
    ```

4. Adicione um arquivo ".env" ao diretório raiz do projeto com esse padrão de dados para conexão com MySQL:
    ```sh
    DB_PORT=3001
    DB_NAME=atlantis
    DB_USER=root
    DB_PASSWORD=senha
    DB_HOST=localhost
    ```

5. Rode o projeto:
    ```sh
    npm start
    ```

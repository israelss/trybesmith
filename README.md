# Trybesmith

## <strong>O que foi desenvolvido</strong>

Para este projeto, foi criada uma loja de itens medievais, no formato de uma _API_, utilizando _Typescript_.

Foram desenvolvidas todas as camadas da aplicação (_Models_, _Service_ e _Controllers_) e, por meio dessa aplicação, é possível realizar as operações básicas que se pode fazer em um determinado banco de dados:
Criação, Leitura, Atualização e Exclusão (_Create, Read, Update_ e _Delete_).

Foram criados alguns _endpoints_ que irão ler e escrever em um banco de dados, utilizando o **MySQL**.

---

## <strong>Rodando o projeto</strong>

> Instale as dependências com `npm install`

> Inicie o projeto com `npm start` ou `npm run dev`


**⚠️ Atenção:**

- Não há front-end neste projeto;

**⚠️ É essencial configurar essas 5 variáveis de ambiente para testar o projeto localmente:**

```
  PORT
  MYSQL_HOST
  MYSQL_USER
  MYSQL_PASSWORD
  JWT_SECRET
```

## <strong>Tabelas</strong>

O banco tem três tabelas: Orders, Products e Users.

```sql
DROP SCHEMA IF EXISTS Trybesmith;
CREATE SCHEMA Trybesmith;

CREATE TABLE Trybesmith.Users (
  id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
  username TEXT NOT NULL,
  classe TEXT NOT NULL,
  level INTEGER NOT NULL,
  password TEXT NOT NULL
);

CREATE TABLE Trybesmith.Orders (
  id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
  userId INTEGER,
  FOREIGN KEY (userId) REFERENCES Trybesmith.Users (id)
);

CREATE TABLE Trybesmith.Products (
  id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
  name TEXT NOT NULL,
  amount TEXT NOT NULL,
  orderId INTEGER,
  FOREIGN KEY (orderId) REFERENCES Trybesmith.Orders (id)
);
```

import request from "supertest";
import app from "../src/app";
import connection from "../src/models/connection";
import recreateDatabase from "./recreateDatabase";
require('mysql2/node_modules/iconv-lite').encodingExists('foo');


describe("2 - Crie um endpoint para o cadastro de produtos", () => {
  beforeAll(async () => {
    await recreateDatabase(connection);
  });
  afterAll(() => {
    connection.end();
  })

  it('Será validado que o campo "name" é obrigatório', async () => {
    const result = await request(app).post("/products").send({
      amount: "amount",
    })

    expect(result.statusCode).toEqual(400);
    expect(result.body.message).toEqual("\"name\" is required");
  });

  it('Será validado que o campo "name" tem o tipo string', async () => {
    const result = await request(app).post("/products").send({
      name: 1,
      amount: "amount",
    })

    expect(result.statusCode).toEqual(422);
    expect(result.body.message).toEqual("\"name\" must be a string");
  });

  it('Será validado que o campo "name" é uma string com mais de 2 caracteres', async () => {
    const result = await request(app).post("/products").send({
      name: "1",
      amount: "amount",
    })

    expect(result.statusCode).toEqual(422);
    expect(result.body.message).toEqual("\"name\" length must be at least 3 characters long");
  });


  it('Será validado que o campo "amount" é obrigatório', async () => {
    const result = await request(app).post("/products").send({
      name: "name",
    })

    expect(result.statusCode).toEqual(400);
    expect(result.body.message).toEqual("\"amount\" is required");
  });

  it('Será validado que o campo "amount" tem o tipo string', async () => {
    const result = await request(app).post("/products").send({
      name: "name",
      amount: 1,
    })

    expect(result.statusCode).toEqual(422);
    expect(result.body.message).toEqual("\"amount\" must be a string");
  });

  it('Será validado que o campo "amount" é uma string com mais de 2 caracteres', async () => {
    const result = await request(app).post("/products").send({
      name: "name",
      amount: "1",
    })

    expect(result.statusCode).toEqual(422);
    expect(result.body.message).toEqual("\"amount\" length must be at least 3 characters long");
  });


  it('Será validado que é possível cadastrar um produto com sucesso', async () => {
    const product = {
      name: 'Arco Escudo Invejável',
      amount: '3 Gemas da Noite'
    }

    const result = await request(app).post("/products").send(product)
    expect(result.statusCode).toEqual(201);
    expect(result.body.id).toBeDefined();
    expect(result.body.name).toEqual(product.name);
    expect(result.body.amount).toEqual(product.amount);

    const [selected] = await connection.execute('SELECT * FROM Trybesmith.Products');
    const products = selected as {
      id?: number
      name: string
      amount: string
      orderId?: number
    }[];

    expect(products).toEqual(
      expect.arrayContaining(
        [expect.objectContaining(product)]
      )
    )

  });
});
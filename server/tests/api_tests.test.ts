// integration tests based on fetch requests to the server

import { describe } from "node:test";

const supertest = require('supertest');
const express = require('express');
const { router } = require('../router');

const app = express();

app.use(express.json());
app.use(router);

const request = supertest(app);

const baseUrl = 'http://localhost:3000';

const transactionProps = [
  "record_id",
  "transaction_id",
  "date",
  "time",
  "location_id",
  "SKU",
  "quantity",
  "is_member",
  "customer_id",
  "tax",
  "total_with_tax"
];

const locationProps = [
  "id",
  "name",
  "full_address",
  "region",
  "city",
  "type"
];

const itemProps = [
  "SKU",
  "unit_of_measurement",
  "description",
  "category",
  "price_no_tax"
];

const customerProps = [
  "id",
  "name",
  "age",
  "email",
  "gender"
];

describe('server should deliver business data on valid requests', () => {
  test('should deliver transactions data', async () => {
    let response = await request.post('/transactions')
      .set('Content-type', 'application/json')
      .send({ query: {} })
    response = JSON.parse(response.text);
    expect(Object.keys(response[0])).toEqual(transactionProps);
  });

  test('should deliver locations data', async () => {
    let response = await request.post('/locations')
      .set('Content-type', 'application/json')
      .send({ query: {} })
    response = JSON.parse(response.text);
    expect(Object.keys(response[0])).toEqual(locationProps);
  });

  test('should deliver items data', async () => {
    let response = await request.post('/items')
      .set('Content-type', 'application/json')
      .send({ query: {} })
    response = JSON.parse(response.text);
    expect(Object.keys(response[0])).toEqual(itemProps);
  });

  test('should deliver customers data', async () => {
    let response = await request.post('/customers')
      .set('Content-type', 'application/json')
      .send({ query: {} })
    response = JSON.parse(response.text);
    expect(Object.keys(response[0])).toEqual(customerProps);
  });
});

describe('server should not crash on invalid requests and should respond to them properly', () => {
  test('should withstand a no query request', async () => {
    let response = await request.post('/customers')
      .set('Content-type', 'application/json')
      .send({})
    expect(response.statusCode).not.toEqual(undefined);
    expect(response.statusCode).not.toEqual(200);
  });

  test('should withstand an incorrect query request', async () => {
    let response = await request.post('/customers')
      .set('Content-type', 'application/json')
      .send({ query: {
        nowhere: {
          date: 3
        }
      }})
    expect(response.statusCode).not.toEqual(undefined);
    expect(response.statusCode).not.toEqual(200);
  });
})

describe('server should register a new user and new database tables and accept requests to them', async () => {
  
})

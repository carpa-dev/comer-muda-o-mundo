"use strict";

const { test, trait } = use("Test/Suite")("Producer");
const Producer = use("App/Models/Producer");
const User = use("App/Models/User");

trait("Test/ApiClient");
trait("Auth/Client");

const fixtures = {
  producer: {
    name: "name",
    address: "address",
    latitude: -22.9035,
    longitude: -43.2096
  },
  producer2: {
    name: "name2",
    address: "address2",
    latitude: -23.9035,
    longitude: -44.2096
  }
};

test("get list of producers", async ({ client }) => {
  const data = fixtures.producer;

  await Producer.create(data);
  const response = await client.get("/api/v1/producers").end();

  response.assertStatus(200);
  response.assertJSONSubset([data]);
});

test("register a producer", async ({ client }) => {
  const user = await User.find(1);
  const data = fixtures.producer;

  const response = await client
    .post("/api/v1/producers")
    .loginVia(user, "jwt")
    .send(data)
    .end();

  response.assertStatus(200);
  response.assertJSONSubset(data);
});

test("update a producer (patch)", async ({ client }) => {
  const user = await User.find(1);
  const data = fixtures.producer;

  const r1 = await client
    .post("/api/v1/producers")
    .loginVia(user, "jwt")
    .send(data)
    .end();

  const response = await client
    .put(`/api/v1/producers/${r1.body.id}`)
    .loginVia(user, "jwt")
    .send({ name: "customname" })
    .end();

  response.assertStatus(200);
  response.assertJSONSubset({ ...data, name: "customname" });
});

test("update a producer (put)", async ({ client }) => {
  const user = await User.find(1);
  const data = fixtures.producer;
  const data2 = fixtures.producer2;

  const r1 = await client
    .post("/api/v1/producers")
    .loginVia(user, "jwt")
    .send(data)
    .end();

  const response = await client
    .put(`/api/v1/producers/${r1.body.id}`)
    .loginVia(user, "jwt")
    .send(data2)
    .end();

  response.assertStatus(200);
  response.assertJSONSubset(data2);
});

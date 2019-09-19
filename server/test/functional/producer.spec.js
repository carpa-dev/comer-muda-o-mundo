'use strict';

const { test, trait, before, after } = use('Test/Suite')('Initiative');
const Initiative = use('App/Models/Initiative');
const User = use('App/Models/User');
const Token = use('App/Models/Token');
const Factory = use('Factory');
const UserModel = Factory.model('App/Models/User');
const TokenModel = Factory.model('App/Models/Token');

trait('Test/ApiClient');
trait('Auth/Client');
trait('DatabaseTransactions');

const fixtures = {
  producer: {
    name: 'name',
    address: 'address',
    latitude: '-22.9035',
    longitude: '-43.2096',
    post: `big post`,
  },
  producer2: {
    name: 'name2',
    address: 'address2',
    latitude: '-23.9035',
    longitude: '-44.2096',
    post: `big post`,
  },
};

before(async () => {
  await User.truncate();
  await Token.truncate();

  async function createUser() {
    const user = await UserModel.create({
      username: 'test',
      email: 'test@test.com',
      password: 'test123',
    });

    const token = await TokenModel.make();

    await user.tokens().save(token);
    return user;
  }

  await createUser();
});

test('get list of producers', async ({ client }) => {
  const data = fixtures.producer;
  const user = await User.first();
  await Initiative.create(data);
  const response = await client
    .get('/api/v1/producers')
    .loginVia(user, 'jwt')
    .end();
  response.assertStatus(200);
  response.assertJSONSubset([data]);
});

test('register a producer', async ({ client }) => {
  const user = await User.first();
  const data = fixtures.producer;

  const response = await client
    .post('/api/v1/producers')
    .loginVia(user, 'jwt')
    .send(data)
    .end();

  response.assertStatus(200);
  response.assertJSONSubset(data);
});

test('update a producer (patch)', async ({ client }) => {
  const user = await User.first();
  const data = fixtures.producer;

  const r1 = await client
    .post('/api/v1/producers')
    .loginVia(user, 'jwt')
    .send(data)
    .end();

  const response = await client
    .put(`/api/v1/producers/${r1.body.id}`)
    .loginVia(user, 'jwt')
    .send({ name: 'customname' })
    .end();

  response.assertStatus(200);
  response.assertJSONSubset({ ...data, name: 'customname' });
});

test('update a producer (put)', async ({ client }) => {
  const user = await User.first();
  const data = fixtures.producer;
  const data2 = fixtures.producer2;

  const r1 = await client
    .post('/api/v1/producers')
    .loginVia(user, 'jwt')
    .send(data)
    .end();

  const response = await client
    .put(`/api/v1/producers/${r1.body.id}`)
    .loginVia(user, 'jwt')
    .send(data2)
    .end();

  response.assertStatus(200);
  response.assertJSONSubset(data2);
});

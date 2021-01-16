const request = require('supertest');
const app = require('../src/index');

test('Should Signup a user', async () => {
  await request(app).post('/users').send({
    name: 'vishal Kumar',
    age: 20,
    email: 'vishalkumar880288@gmail.com',
    password: 'red123!',
  });
});

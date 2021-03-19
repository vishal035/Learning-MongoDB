const request = require('supertest');
const app = require('../src/index');
const User = require('../src/models/users');

const userOne = {
  name: 'Mike',
  email: 'somthing@anything.com',
  password: 'Yaaaa!!!!!',
};

beforeEach(async () => {
  // console.log('Before Each Function Has Runned');
  await User.deleteMany();
  await new User(userOne).save();
});

test('Should Signup a user', async () => {
  await request(app)
    .post('/users')
    .send({
      name: 'vishal Kumar',
      age: 20,
      email: 'vishalkumar880288@gmail.com',
      password: 'red123!',
    })
    .expect(201);
});

// test('User Should Login', async () => {
//   await request(app)
//     .post('/users/login')
//     .send({ email: userOne.email, password: userOne.password })
//     .expect(200);
// });

test('Should Not Login', async () => {
  await request(app)
    .post('/users/login')
    .send({ email: userOne.email, password: 'WRONG PASSWORD' })
    .expect(400);
});

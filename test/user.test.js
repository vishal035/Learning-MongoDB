const request = require('supertest');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const app = require('../src/index');
const User = require('../src/models/users');

const userOneId = new mongoose.Types.ObjectId();

const userOne = {
  _id: userOneId,
  name: 'Mike',
  email: 'somthing@anything.com',
  password: 'Yaaaa!!!!!',
  tokens: [
    {
      token: jwt.sign({ _id: userOneId }, process.env.JWTSCERETLOCK),
    },
  ],
};

beforeEach(async () => {
  // console.log('Before Each Function Has Runned');
  await User.deleteMany();
  await new User(userOne).save();
});

test('Should Signup a user', async () => {
  const response = await request(app)
    .post('/users')
    .send({
      name: 'vishal Kumar',
      age: 20,
      email: 'vishalkumar880288@gmail.com',
      password: 'red123!',
    })
    .expect(201);

  const user = await User.findById(response.body.user._id);
  expect(user).not.toBeNull();
  // console.log(user);
  expect(response.body).toMatchObject({
    user: {
      name: 'vishal Kumar',
      email: 'vishalkumar880288@gmail.com',
    },
    token: user.tokens[0].token,
  });
  expect(user.password).not.toBe('red123!');
});

// test('User Should Login', async () => {
//   await request(app)
//     .post('/users/login')
//     .send({ email: userOne.email, password: userOne.password })
//     .expect(200);
// });

// test('Should Logout All The Users', async () => {
//   await request(app).post('/users/logoutAll').send().expect(200);
// });

test('Should Not Login', async () => {
  await request(app)
    .post('/users/login')
    .send({ email: userOne.email, password: 'WRONG PASSWORD' })
    .expect(400);
});

test('Should Get Profile of Signed User', async () => {
  await request(app)
    .get('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
});

test('Shiould not get the profile without tokens', async () => {
  await request(app).get('/users/me').send().expect(401);
});

test('Should Not Delete signed in user Account', async () => {
  await request(app)
    .delete('/users/me')
    // .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(401);
});

test('Should Delete signed in user Account', async () => {
  await request(app)
    .delete('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
});

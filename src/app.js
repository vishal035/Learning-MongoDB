const express = require('express');
require('./db/mongoose');
const userRouter = require('./routers/users');
const taskRouter = require('./routers/tasks');

const app = express();
const port = process.env.PORT || 3000;

// app.use((req,res,next) =>{
// console.log(req.method, req.path);
// if(req.method === 'GET'){
//     res.send("Get Request are disabled")
// }else{
//     next()
// }

// res.status(503).send("Site Uner Mantanence") // --> To block all rquest
// })

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log(`Server is up on ${port}`);
});

// const jwt = require('jsonwebtoken')

// const myFunction = async () => {
//     const token = jwt.sign({ _id: 'abc123'},'thisismynewcourse')
//     console.log(token)

//     const data = jwt.verify(token, 'thisismynewcourse')
//     console.log(data);
// }

// myFunction()

// const pet = {
//     name: "kiti"
// }

// pet.toJSON  = function() {
//     return {name: "Dog"}
// }

// console.log(JSON.stringify(pet));
const Task = require('./models/tasks');
const User = require('./models/users');

const main = async () => {
  //   const task = await Task.findById('5fe16e70da9f423368689994');
  //   await task.populate('owner').execPopulate();
  //   console.log(task.owner);

  const user = await User.findById('5fdee16e80863c3f5cd0f770');
  await user.populate('tasks').execPopulate();
  console.log(user.tasks);
};

main();

const express = require('express');
require('./db/mongoose');
const userRouter = require('./routers/users');
const taskRouter = require('./routers/tasks');

const app = express();
const port = process.env.PORT;

const multer = require('multer');
const upload = multer({
  dest: 'images',
});

app.post('/upload', upload.single('upload'), (req, res) => {
  res.send();
});

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  // console.log(process.env);
  console.log(`Server is up on ${port}`);
});

// SENDGRID_API_KEY=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

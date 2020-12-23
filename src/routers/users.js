const express = require('express');
const multer = require('multer');
const User = require('../models/users');
const router = new express.Router();
const auth = require('../middleware/auth');

const upload = multer({
  dest: 'images',
  limits: {
    fileSize: 20000000,
  },
  fileFilter(req, file, cb) {
    if (
      !file.originalname.match(
        /\.(webp|gif|png|jpg|jpeg|jpe|jif|jfif|jfi|jp2|j2k|jpf|jpx|jpm|mj2|svg|svgz)$/
      )
    ) {
      return cb(new Error('Please upload a correct Image'));
    }
    cb(undefined, true);

    // cb(new Error('File Must be a image..!'));
    // cb(undefined, true);
    // cb(undefined, false);
  },
});

router.post('/users/login', async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

router.post('/users/logout', auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });

    await req.user.save();

    res.send(req.user.tokens);
  } catch (error) {
    res.status(500).send();
  }
});

router.post('/users/logoutAll', auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send(req.user.tokens);
  } catch (error) {
    res.status(500).send();
  }
});

router.post('/users', async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/users/me', auth, async (req, res) => {
  res.send(req.user);
});

router.post(
  '/users/me/avatar',
  auth,
  upload.single('upload'),
  async function (req, res) {
    res.send('Profile Picture is added...');
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

router.patch('/users/me', auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'age', 'email', 'password'];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({
      error: 'Invalid Updates!',
    });
  }

  try {
    // const user = await User.findById(req.params.id)
    updates.forEach((update) => (req.user[update] = req.body[update]));
    await req.user.save();
    // const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
    res.send(req.user);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete('/users/me', auth, async (req, res) => {
  try {
    // const user = await User.findByIdAndDelete(req.user._id)

    // if (!user) {
    //     return res.status(404).send({
    //         "error": "User Does not exists!"
    //     })
    // }
    await req.user.remove();
    res.send(`User removed\n${req.user}`);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;

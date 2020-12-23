const express = require('express');
const multer = require('multer');
const User = require('../models/users');
const router = new express.Router();
const auth = require('../middleware/auth');
const sharp = require('sharp');
const { sendWelcomeEmail, cancellationEmail } = require('../emails/email');

const upload = multer({
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
    sendWelcomeEmail(user.email, user.name);
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
  async (req, res) => {
    const buffer = await sharp(req.file.buffer)
      .resize({ width: 64, height: 64 })
      .png()
      .toBuffer();
    req.user.avatar = buffer;
    await req.user.save();
    res.send('Profile Picture is added...');
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

router.get('/users/:id/avatar', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user || !user.avatar) {
      throw new Error();
    }
    res.set('Content-Type', 'image/png');
    res.send(user.avatar);
  } catch (error) {
    res.status(404).send();
  }
});

router.delete('/users/me/avatar', auth, async (req, res) => {
  try {
    req.user.avatar = undefined;
    await req.user.save();
    res.send('Profile Picture is removed..!');
  } catch (error) {
    res.status(400).send('Somthing is not write..!');
  }
});

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
    cancellationEmail(req.user.email, req.user.name);
    res.send(`User removed\n${req.user}`);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

module.exports = router;

const jwt = require('jsonwebtoken');
const User = require('../models/users');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWTSCERETLOCK);
    const user = await User.findById({
      _id: decoded._id,
      'tokens.token': token,
    });

    if (!user) {
      throw new Error();
    }
    req.token = token;
    req.user = user;
    // console.log(req.user);
    next();
  } catch (error) {
    res.status(401).send({
      error: 'Please Authenticate.',
    });
  }
};

module.exports = auth;

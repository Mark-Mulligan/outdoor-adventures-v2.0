const orm = require('../config/orm');

const User = {
  create: (userObj, errCb, cb) => {
    orm.createUser(
      userObj,
      (err) => errCb(err),
      (result) => {
        cb(result);
      },
    );
  },

  findOne: (googleId, errCb, cb) => {
    orm.findUser(
      googleId,
      (err) => errCb(err),
      (result) => cb(result),
    );
  },
};

module.exports = User;

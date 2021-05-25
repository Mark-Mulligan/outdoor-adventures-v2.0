const connection = require('./connection');

const orm = {
  createUser: (userObj, errCb, cb) => {
    const { fullName, email, googleId } = userObj;
    const queryString = 'INSERT INTO users (fullname, email, google_id) VALUES (?, ?, ?);';

    connection.query(queryString, [fullName, email, googleId], (err, result) => {
      if (err) {
        return errCb(err);
      }

      return cb(result);
    });
  },
};

module.exports = orm;

const connection = require('../config/connection');

exports.getParks = async (req, res) => {
  const limit = parseInt(req.query.limit, 10);
  const page = parseInt(req.query.page, 10);

  const offset = (page - 1) * limit;
  const endIndex = page * limit;

  const queryString = `SELECT *, count(*) OVER() AS results from parks LIMIT ${limit} OFFSET ${offset};`;

  try {
    const [result] = await connection.promise().query(queryString);

    const data = {};
    console.log(result);
    data.totalPages = Math.ceil(result[0].results / limit);

    if (endIndex < result[0].results) {
      data.next = {
        page: page + 1,
        limit,
      };
    }

    if (page - 1 > 0) {
      data.previous = {
        page: page - 1,
        limit,
      };
    }

    data.results = result;
    res.status(200).json(data);
  } catch (e) {
    console.log(e);
  }
};

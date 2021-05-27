const connection = require('../config/connection');

const formateQueryData = (data, totalResults, limit, endIndex, page) => {
  const formattedData = {};
  formattedData.totalPages = Math.ceil(totalResults / limit);

  if (endIndex < totalResults) {
    formattedData.next = {
      page: page + 1,
      limit,
    };
  }

  if (page - 1 > 0) {
    formattedData.previous = {
      page: page - 1,
      limit,
    };
  }

  formattedData.results = data;
  return formattedData;
};

exports.getParks = async (req, res) => {
  const limit = parseInt(req.query.limit, 10);
  const page = parseInt(req.query.page, 10);

  const offset = (page - 1) * limit;
  const endIndex = page * limit;

  const queryString = `SELECT *, count(*) OVER() AS totalResults from parks LIMIT ${limit} OFFSET ${offset};`;

  try {
    const [result] = await connection.promise().query(queryString);
    const data = formateQueryData(result, result[0].totalResults, limit, endIndex, page);
    res.status(200).json(data);
  } catch (e) {
    console.log(e);
  }
};

/* eslint-disable object-curly-newline */
const connection = require('../config/connection');

const formateQueryData = (data, totalResults, limit, endIndex, page) => {
  const formattedData = {};
  formattedData.totalResults = totalResults;
  formattedData.totalPages = Math.ceil(totalResults / limit);
  formattedData.dataStart = endIndex - limit + 1;
  formattedData.dataEnd = endIndex;

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

  const results = [];
  data.forEach(({ fullname, parkcode, states, designation }) => {
    results.push({
      fullname,
      parkcode,
      states,
      designation,
    });
  });

  formattedData.results = results;
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

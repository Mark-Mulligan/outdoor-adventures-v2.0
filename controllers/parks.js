/* eslint-disable object-curly-newline */
const connection = require('../config/connection');

const formateQueryData = (data, totalResults, limit, endIndex, page) => {
  const formattedData = {};
  formattedData.totalResults = totalResults;
  formattedData.totalPages = Math.ceil(totalResults / limit);
  formattedData.dataStart = endIndex - limit + 1;
  formattedData.dataEnd = endIndex;
  formattedData.currentPage = page;

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

const designationQuery = (designation) => {
  const parkDes = designation.split(',');
  let sqlString = '';
  parkDes.forEach((park, index) => {
    sqlString += index === parkDes.length - 1 ? `'${park}'` : `'${park}',`;
  });
  return ` designation IN (${sqlString})`;
};

const statesQuery = (states) => {
  const statesArr = states.split(',');
  let sqlString = '';
  statesArr.forEach((state, index) => {
    sqlString += index === 0 ? ` states LIKE '%${state}%'` : ` OR states LIKE '%${state}%'`;
  });
  return sqlString;
};

exports.getParks = async (req, res) => {
  const limit = parseInt(req.query.limit, 10);
  const page = parseInt(req.query.page, 10);
  const { designation, states } = req.query;

  let queryString = 'SELECT *, count(*) OVER() as totalResults from parks';

  if (designation && states) {
    queryString += ` WHERE${statesQuery(states)} AND${designationQuery(designation)}`;
  } else if (states) {
    queryString += ` WHERE${statesQuery(states)}`;
  } else if (designation) {
    queryString += ` WHERE${designationQuery(designation)}`;
  }

  const offset = (page - 1) * limit;
  const endIndex = page * limit;

  queryString += ` LIMIT ${limit} OFFSET ${offset};`;
  console.log(queryString);

  try {
    const [result] = await connection.promise().query(queryString);
    const data = formateQueryData(result, result[0].totalResults, limit, endIndex, page);
    res.status(200).json(data);
  } catch (e) {
    console.log(e);
  }
};

/* eslint-disable max-len */
/* axios.get(`https://developer.nps.gov/api/v1/parks?api_key=${process.env.NATIONAL_PARKS_APIKEY}&limit=468`).then(
    (response) => {
      // const parksData = [];
      const parks = response.data.data;
      let parkValues = '';

      parks.forEach((park, index) => {
        if (index === parks.length - 1) {
          parkValues += `("${park.fullName}", "${park.parkCode}", "${park.states}", "${park.designation}")`;
        } else {
          parkValues += `("${park.fullName}", "${park.parkCode}", "${park.states}", "${park.designation}"), `;
        }
      });

      const queryString = `INSERT INTO parks (fullname, parkcode, states, designation) VALUES ${parkValues}`;

      connection.query(queryString, (queryErr, result) => {
        if (queryErr) throw queryErr;
        else console.log(result);
      });

      console.log(parkValues);

      // console.log(response.data.data);
    },
    (error) => {
      console.log(error);
    },
  );

  console.log(`connected as id ${connection.threadId}`);
}); */

import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ParkPage = () => {
  const { parkcode } = useParams();

  const getParkData = async () => {
    console.log(parkcode);
    try {
      const { data } = await axios.get(`/api/parks/${parkcode}`);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getParkData();
  });

  return <div>Park Page</div>;
};

export default ParkPage;

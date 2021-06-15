import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ParkPage = () => {
  const [parkData, setParkData] = useState([]);
  const { parkcode } = useParams();

  const getParkData = useCallback(async () => {
    try {
      const { data } = await axios.get(`/api/parks/${parkcode}`);
      setParkData(data);
    } catch (err) {
      console.log(err);
    }
  }, [parkcode]);

  useEffect(() => {
    getParkData();
  }, [getParkData]);

  return <div>Park Page</div>;
};

export default ParkPage;

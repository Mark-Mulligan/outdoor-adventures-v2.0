import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import RingLoader from 'react-spinners/RingLoader';

import Description from '../components/parkInfo/Description';
import EntranceFees from '../components/parkInfo/EntranceFees';
import Hours from '../components/parkInfo/Hours';
import Actvities from '../components/parkInfo/Activites';
import Contact from '../components/parkInfo/Contact';
import ParkInfoNav from '../components/parkInfo/ParkInfoNav';
import ParkPhotos from '../components/parkInfo/ParkPhotos';

const ParkPage = () => {
  const [parkData, setParkData] = useState([]);
  const [fetchingData, setFetchingData] = useState(false);
  const { parkcode } = useParams();

  const getParkData = useCallback(async () => {
    setFetchingData(true);
    try {
      const { data } = await axios.get(`/api/parks/${parkcode}`);
      setTimeout(() => {
        console.log(data[0]);
        setParkData(data[0]);
        setFetchingData(false);
      }, 20000);
    } catch (err) {
      console.log(err);
    }
  }, [parkcode]);

  useEffect(() => {
    getParkData();
  }, [getParkData]);

  return (
    <div className="park-page-background">
      {fetchingData ? (
        <div className="container loading-container">
          <div>
            <div className="loading-spinner-wrapper">
              <RingLoader size={150} />
            </div>
            <p>Loading Park Data...</p>
          </div>
        </div>
      ) : (
        <div className="container park-info-container">
          <div className="park-left-nav-container">
            <ParkInfoNav />
          </div>
          <div className="park-info">
            <h1 className="text-center">{parkData?.fullName}</h1>
            <Description parkDescription={parkData?.description} />
            {parkData.entranceFees && <EntranceFees feeData={parkData?.entranceFees} />}
            {parkData.operatingHours && <Hours operatingHours={parkData?.operatingHours} />}
            {parkData.activities && <Actvities activities={parkData?.activities} />}
            {parkData.contacts && <Contact contactInfo={parkData.contacts} />}
            {parkData.images && <ParkPhotos photos={parkData?.images} />}
          </div>
        </div>
      )}
    </div>
  );
};

export default ParkPage;

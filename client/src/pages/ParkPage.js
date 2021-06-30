import React, { useEffect, useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import 'react-image-gallery/styles/css/image-gallery.css';

import Description from '../components/parkInfo/Description';
import EntranceFees from '../components/parkInfo/EntranceFees';
import Hours from '../components/parkInfo/Hours';
import Actvities from '../components/parkInfo/Activites';
import Contact from '../components/parkInfo/Contact';
import ParkInfoNav from '../components/parkInfo/ParkInfoNav';
import ParkPhotos from '../components/parkInfo/ParkPhotos';

const ParkPage = () => {
  const [parkData, setParkData] = useState([]);
  const { parkcode } = useParams();

  const getParkData = useCallback(async () => {
    try {
      const { data } = await axios.get(`/api/parks/${parkcode}`);
      console.log(data[0]);
      setParkData(data[0]);
    } catch (err) {
      console.log(err);
    }
  }, [parkcode]);

  useEffect(() => {
    getParkData();
  }, [getParkData]);

  return (
    <div className="park-page-background">
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
    </div>
  );
};

export default ParkPage;

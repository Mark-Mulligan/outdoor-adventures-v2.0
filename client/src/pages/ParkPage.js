import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import 'react-image-gallery/styles/css/image-gallery.css';
import ImageGallery from 'react-image-gallery';

import Description from '../components/parkInfo/Description';
import EntranceFees from '../components/parkInfo/EntranceFees';
import Hours from '../components/parkInfo/Hours';
import Actvities from '../components/parkInfo/Activites';
import Contact from '../components/parkInfo/Contact';
import ParkInfoNav from '../components/parkInfo/ParkInfoNav';

const images = [
  {
    original: 'https://picsum.photos/id/1018/1000/600/',
    thumbnail: 'https://picsum.photos/id/1018/250/150/',
  },
  {
    original: 'https://picsum.photos/id/1015/1000/600/',
    thumbnail: 'https://picsum.photos/id/1015/250/150/',
  },
  {
    original: 'https://picsum.photos/id/1019/1000/600/',
    thumbnail: 'https://picsum.photos/id/1019/250/150/',
  },
];

const ParkPage = () => {
  const [parkData, setParkData] = useState([]);
  const [images, setImages] = useState([]);
  const { parkcode } = useParams();

  const populateCarousel = (inputImgs) => {
    let result = [];
    inputImgs.forEach((img) => {
      let imgData = {};
      imgData.original = img.url;
      imgData.thumbnail = img.url;
      imgData.originalAlt = img.altText;
      imgData.originalHeight = 300;
      imgData.originalWidth = 300;
      result.push(imgData);
    });
    setImages(result);
  };

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
    if (parkData.images) {
      populateCarousel(parkData.images);
    }
  }, [parkData]);

  useEffect(() => {
    getParkData();
  }, [getParkData]);

  return (
    <div className="park-page-background">
      <div className="container park-info-container">
        <div className="park-left-nav-container">
          <ParkInfoNav />
        </div>
        <div className="container park-info">
          <h1 className="text-center">{parkData?.fullName}</h1>
          <Description parkDescription={parkData?.description} />
          {parkData.entranceFees && <EntranceFees feeData={parkData?.entranceFees} />}
          {parkData.operatingHours && <Hours operatingHours={parkData?.operatingHours} />}
          {parkData.activities && <Actvities activities={parkData?.activities} />}
          {parkData.contacts && <Contact contactInfo={parkData.contacts} />}
        </div>
      </div>
    </div>
  );
};

export default ParkPage;

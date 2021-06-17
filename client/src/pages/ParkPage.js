import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import 'react-image-gallery/styles/css/image-gallery.css';
import ImageGallery from 'react-image-gallery';

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
      console.log(data);
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

  const renderEntranceFeeInfo = () => {
    return parkData.entreeFees.map((fee) => {
      return (
        <div className="park-info">
          <h3>{fee.title}</h3>
          <p>{fee.description}</p>
          <p>{fee.cost}</p>
        </div>
      );
    });
  };

  return (
    <div className="park-page-background">
      <div className="container park-info-container">
        <div></div>
        <div className="container">
          <h1 className="text-center">{parkData?.name}</h1>
          <h3>Description</h3>
          <p>{parkData?.description}</p>
          <h3>Entrance Fees</h3>
          {parkData.entreeFees && renderEntranceFeeInfo()}
        </div>
      </div>
    </div>
  );
};

export default ParkPage;

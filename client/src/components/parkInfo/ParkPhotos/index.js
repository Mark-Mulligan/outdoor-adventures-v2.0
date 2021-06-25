import { useState } from 'react';
import Gallery from 'react-grid-gallery';
import './ParkPhotos.css';

const ParkPhotos = ({ photos }) => {
  const [photoIndex, setPhotoIndex] = useState(-1);

  const formatPhotos = () => {
    return photos.map((photo) => {
      return {
        src: photo.url,
        thumbnail: photo.url,
      };
    });
  };

  const handlePhotoClick = (event) => {
    setPhotoIndex(parseInt(event.target.getAttribute('data-photoindex')));
  };

  console.log(photos);

  return (
    <div id="photos" className="container">
      <h2>Photos</h2>
      <div className="grid-images">
        {photos.map((photo, index) => (
          <img
            onClick={handlePhotoClick}
            className="grid-image"
            data-photoindex={index}
            key={photo.url}
            src={photo.url}
            alt={photo.altText}
          />
        ))}
      </div>

      <div>{photoIndex >= 0 && <img src={photos[photoIndex].url} alt={photos[photoIndex.altText]} />}</div>
    </div>
  );
};

export default ParkPhotos;

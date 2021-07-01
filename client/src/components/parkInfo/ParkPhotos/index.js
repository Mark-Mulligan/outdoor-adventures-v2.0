import { useState } from 'react';
import './ParkPhotos.css';

const ParkPhotos = ({ photos }) => {
  const [photoIndex, setPhotoIndex] = useState(-1);
  const [showPhotoModal, setShowPhotoModal] = useState(false);

  const handlePhotoClick = (event) => {
    setPhotoIndex(parseInt(event.target.getAttribute('data-photoindex')));
    setShowPhotoModal(true);
  };

  const handlePhotoModalClose = () => {
    setShowPhotoModal(false);
  };

  const onRightArrowClick = () => {
    photoIndex < photos.length - 1 ? setPhotoIndex(photoIndex + 1) : setPhotoIndex(0);
  };

  const onLeftArrowClick = () => {
    photoIndex === 0 ? setPhotoIndex(photos.length - 1) : setPhotoIndex(photoIndex - 1);
  };

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

      <div id="myModal" className={showPhotoModal ? 'photo-modal' : 'hidden'}>
        <span onClick={handlePhotoModalClose} className="close">
          &times;
        </span>
        {photoIndex >= 0 && (
          <div className="modal-inner-wrapper">
            <h2 className="text-center">{photos[photoIndex].title}</h2>
            <div className="photo-wrapper">
              <img className="photo-modal-content" src={photos[photoIndex].url} alt={photos[photoIndex.altText]} />
            </div>
            <div className="photo-modal-controller">
              <div className="arrow-col right" onClick={onRightArrowClick}>
                <span className="arrow-wrapper">
                  <i className="fas fa-3x fa-chevron-right"></i>
                </span>
              </div>
              <div className="arrow-col left" onClick={onLeftArrowClick}>
                <span className="arrow-wrapper">
                  <i className="fas fa-3x fa-chevron-left"></i>
                </span>
              </div>
              <div className="photo-modal-description">
                <p>{photos[photoIndex].caption}</p>
                <p className="fst-italic fw-lighter">
                  Photo {photoIndex + 1} of {photos.length}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ParkPhotos;

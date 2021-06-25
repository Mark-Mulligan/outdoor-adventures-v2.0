import { useState } from 'react';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';

import './ParkPhotos.css';

const useStyles = makeStyles((theme) => ({
  arrow: {
    color: '#ccc',
  },
}));

const ParkPhotos = ({ photos }) => {
  const classes = useStyles();
  const [photoIndex, setPhotoIndex] = useState(-1);
  const [showPhotoModal, setShowPhotoModal] = useState(false);

  const handlePhotoClick = (event) => {
    setPhotoIndex(parseInt(event.target.getAttribute('data-photoindex')));
    setShowPhotoModal(true);
  };

  const handlePhotoModalClose = () => {
    setShowPhotoModal(false);
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

      <div id="myModal" className={showPhotoModal ? 'photo-modal' : 'hidden'}>
        <span onClick={handlePhotoModalClose} className="close">
          &times;
        </span>
        {photoIndex >= 0 && (
          <div className="modal-inner-wrapper">
            <h2 className="text-center">{photos[photoIndex].title}</h2>
            <div className="photo-wrapper">
              <div className="arrow-col right">
                <span className="arrow-wrapper">
                  <i class="fas fa-3x fa-chevron-right"></i>
                </span>
              </div>
              <div className="arrow-col left">
                <span className="arrow-wrapper">
                  <i class="fas fa-3x fa-chevron-left"></i>
                </span>
              </div>

              <img className="photo-modal-content" src={photos[photoIndex].url} alt={photos[photoIndex.altText]} />
            </div>
            <p className="photo-modal-description">{photos[photoIndex].caption}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ParkPhotos;

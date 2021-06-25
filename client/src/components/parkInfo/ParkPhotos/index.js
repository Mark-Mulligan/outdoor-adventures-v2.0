import Gallery from 'react-grid-gallery';
import './ParkPhotos.css';

const ParkPhotos = ({ photos }) => {
  const formatPhotos = () => {
    return photos.map((photo) => {
      return {
        src: photo.url,
        thumbnail: photo.url,
      };
    });
  };

  console.log(photos);

  return (
    <div id="photos" className="container">
      <h2>Photos</h2>
      <div>
        {photos.map((photo) => (
          <img className="grid-image" key={photo.url} src={photo.url} alt={photo.altText} />
        ))}
      </div>
    </div>
  );
};

export default ParkPhotos;

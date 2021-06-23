import Gallery from 'react-grid-gallery';

const ParkPhotos = ({ photos }) => {
  const formatPhotos = () => {
    return photos.map((photo) => {
      return {
        src: photo.url,
        thumbnail: photo.url,
        thumbnailWidth: 320,
        thumbnailHeight: 174,
      };
    });
  };

  console.log(photos);

  return (
    <div id="photos" className="container">
      <h2>Photos</h2>
      <Gallery images={formatPhotos()} />
    </div>
  );
};

export default ParkPhotos;

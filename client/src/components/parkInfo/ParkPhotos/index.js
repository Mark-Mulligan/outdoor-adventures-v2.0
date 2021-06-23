const ParkPhotos = ({ photos }) => {
  return (
    <div id="photos" className="container">
      <h2>Photos</h2>
      <hr />
      <div className="row">
        {photos.map((photo) => {
          return (
            <div key={photo.title} className="col-xl-4 col-lg-6 col-12 mb-4">
              <img className="img-fluid" src={photo.url} alt={photo.altText} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ParkPhotos;

const ParkPhotos = ({ photos }) => {
  return (
    <div id="#photos" className="container">
      <h2>Photos</h2>
      <hr />
      <div className="row">
        {photos.map((photo) => {
          return (
            <div key={photo.title} className="col-md-4 col-sm-6 col-12">
              <img className="img-fluid" src={photo.url} alt={photo.altText} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ParkPhotos;

const Description = ({ parkDescription }) => {
  return (
    <div id="description" className="container info-section">
      <h2>Description</h2>
      <hr />
      <p>{parkDescription}</p>
    </div>
  );
};

export default Description;

const EntranceFees = ({ feeData }) => {
  return (
    <div id="entrance-fees" className="container info-section">
      <h2>Entrance Fees</h2>
      <hr />
      {feeData.map((fee) => {
        return (
          <div key={fee.title} className="fee-info">
            <h6>
              <span className="fw-bold">{fee.title}</span> <span className="fst-italic">${fee.cost}</span>
            </h6>
            <p>{fee.description}</p>
          </div>
        );
      })}
    </div>
  );
};

export default EntranceFees;

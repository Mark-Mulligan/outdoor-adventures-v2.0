const EntranceFees = ({ feeData }) => {
  return (
    <div>
      <h3>Entrance Fees</h3>
      {feeData.map((fee) => {
        return (
          <div key={fee.title} className="fee-info">
            <p>{fee.title}</p>
            <p>{fee.description}</p>
            <p>{fee.cost}</p>
          </div>
        );
      })}
    </div>
  );
};

export default EntranceFees;

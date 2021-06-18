const EntranceFees = ({ title, description, cost }) => {
  return (
    <div className="park-info">
      <p>{title}</p>
      <p>{description}</p>
      <p>{cost}</p>
    </div>
  );
};

export default EntranceFees;

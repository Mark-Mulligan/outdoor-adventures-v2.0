const Actvities = ({ activities }) => {
  return (
    <div id="activites" className="container info-section">
      <h2>Activites</h2>
      <hr />
      <ul className="no-space-list">
        {activities.map((activity) => (
          <li key={activity.id}>{activity.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Actvities;

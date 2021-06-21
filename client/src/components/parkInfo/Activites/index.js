const Actvities = ({ activities }) => {
  return (
    <div>
      {console.log(activities)}
      <h3>Activites</h3>
      <ul>
        {activities.map((activity) => (
          <li key={activity.id}>{activity.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Actvities;

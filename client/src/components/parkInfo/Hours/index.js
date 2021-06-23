const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

const Hours = ({ operatingHours }) => {
  return (
    <div className="container">
      <h3>Operating Hours</h3>

      <div className="row">
        <div className="col">
          <p>Standard Hours</p>
          <ol className="no-space-list">
            {days.map((day) => {
              return (
                <li key={day}>
                  {day} {operatingHours[0].standardHours[day]}
                </li>
              );
            })}
          </ol>
        </div>

        <div className="col">
          <p>Holiday Hours</p>
          <ul className="no-space-list">
            {operatingHours[0].exceptions.map((exception) => {
              return (
                <li key={exception.startDate}>
                  {exception.name} ({exception.startDate}) {exception.exceptionHours.monday}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Hours;
